import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOTP, SendVerifyOtp, verifyEmail } from '../controller/authContoller.js';
import userAuth from '../Middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/send-verify-otp', userAuth, SendVerifyOtp);
userRouter.post('/verify-account', userAuth, verifyEmail);
userRouter.post('/is-auth', userAuth, isAuthenticated);
userRouter.post('/send-reset-otp', sendResetOTP);
userRouter.post('/reset-password', resetPassword);


export default userRouter