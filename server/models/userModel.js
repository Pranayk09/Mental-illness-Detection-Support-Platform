import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp : {type: String, default: ' '},
    verifyOtpExpiredAt : {type: Number, default: 0},
    isAccountVerified : {type: Boolean, default: false},
    resetOtp: {type:String, default: ''},
    resetOtpExpiredAt: {type:Number, default:0},
    plan: { type: String, default: "Free" },
  condition: { type: String, default: "" },
  currentDay: { type: Number, default: 1 },
  lastTaskUpdate: { type: Date, default: null },
  lastTaskCompleted: { type: Boolean, default: false } ,
  assessmentLocked: { type: Boolean, default: false },
  age: { type: Number, default: null },
  gender: { type: String, default: "" }

})

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;

