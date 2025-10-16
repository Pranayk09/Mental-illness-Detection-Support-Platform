import assessmentModel from "../models/assessmentModel.js";
import jwt from 'jsonwebtoken'

import axios from 'axios'
import userModel from "../models/userModel.js";


export const submitAssessment = async(req,res)=>{
    
    try { 
   const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({ success: false, message: "No token found in cookies" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
      const user = await userModel.findById(userId);
       if (user.assessmentLocked) {
        return res.json({
        success: false,
        message: "You have already completed an assessment. Please complete your 10-day plan before retaking the test."
      });
    }

        const {answers} = req.body;
         if(!userId || !answers) {  
          return res.json({success: false, message:"Missing Details" });
         }


         if (!Array.isArray(answers) || answers.length === 0) {
          return res.json({success: false, message: 'Answers are required'});
         }

           const age = Number(answers[0]);
           const gender = answers[1] === 1 ? "Male" : "Female";

         const newAssessment = new assessmentModel({ userId, answers});
         const savedAssessment = await newAssessment.save();

          const mlResponse = await axios.post("http://127.0.0.1:5000/predict", { userId, answers });
          const statusMap = {
              Stressed: "Stress",
              Anxious: "Anxiety",
              Depressed: "Depression",
            };
           const rawCondition = mlResponse.data.Mental_Health_Status;
            const normalizedCondition = statusMap[rawCondition] || rawCondition;
            const severityResult = mlResponse.data.Severity;

            
            savedAssessment.result = {
              condition: normalizedCondition,
              severity: severityResult,
            };
            await savedAssessment.save();

            // Update user record
            await userModel.findByIdAndUpdate(userId, {
              assessmentLocked : true,
              condition: normalizedCondition,
              currentDay: 1,
              lastTaskCompleted: false,
              lastTaskUpdate: null,
              age,
              gender
            });

         return res.json({success:true, message:'Assessment submitted & evaluated', assessment:savedAssessment, });
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}


export const getAssessmentStatus = async(req,res)=>{
   const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({ success: false, message: "No token found in cookies" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
  const existing = await assessmentModel.findOne({ userId });
  if (existing) {
    return res.json({ completed: true });
  }
  res.json({ completed: false });

}