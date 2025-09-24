import assessmentModel from "../models/assessmentModel.js";


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

        //   const mlResponse = await axios.post("http://localhost:5001/predict", { userId, answers });

        //   savedAssessment.result = {
        //      condition: mlResponse.data.condition,
        //      severity: mlResponse.data.severity
        //   };
        //    await savedAssessment.save();

         return res.json({success:true, message:'Assessment submitted & evaluated', assessment:savedAssessment, });
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}
