import assessmentModel from "../models/assessmentModel.js";

import axios from 'axios'


export const submitAssessment = async(req,res)=>{
    
    try { 
         const userId = req.userId; 
        const {answers} = req.body;
         if(!userId || !answers) {  
          return res.json({success: false, message:"Missing Details" });
         }


         if (!Array.isArray(answers) || answers.length === 0) {
          return res.json({success: false, message: 'Answers are required'});
         }

         const newAssessment = new assessmentModel({ userId, answers});
         const savedAssessment = await newAssessment.save();

          const mlResponse = await axios.post("http://127.0.0.1:5000/predict", { userId, answers });

          savedAssessment.result = {
             condition: mlResponse.data.Mental_Health_Status,
             severity: mlResponse.data.Severity
          };
           await savedAssessment.save();

         return res.json({success:true, message:'Assessment submitted & evaluated', assessment:savedAssessment, });
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}
