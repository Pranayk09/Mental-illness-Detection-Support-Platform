import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  answers: {
    type: [Number], 
    required: true
  },
  result: {
    condition: { type: String },
    severity: { type: String }  
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const assessmentModel = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
export default  assessmentModel;
