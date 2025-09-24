import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodemailer.js";


export const register = async(req,res)=>{
    const {name, email, password} =req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'});
    }

   

    try {
     const user = await userModel.findOne({email});
    if(user){
        return res.json({success: false, message: "Account already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await userModel.create({
        name, email, password:hashedPassword
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn: '7d'} );
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ,
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60* 60 * 1000
    });

    // Sending Welcome Email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to:email,
        subject: 'Welcome to MindWell !',
        text: `Welcome to Mindwell website. Your account has been created with email id: ${email}`
    }

    await transporter.sendMail(mailOptions);
    res.json({success:true, userData: newUser, token, message: "Account created successfully"});

        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}


export const login = async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
      return res.json({success: false, message: 'Email and password are required'});
    }
    
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "Invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message: "Invalid Password"});
        }
        
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'} );
     res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ,
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60* 60 * 1000
    });

     res.json({success:true, userData: user, token, message: "Logged in successfully"});


    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}


export const logout = async(req,res)=>{
    try {
        res.clearCookie('token' , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ,
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success: true, message:"Logged out sucessfully"});
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Send verication otp to the User's Email
export const SendVerifyOtp = async(req,res)=>{
    try {
        const userId = req.userId; 
        const user = await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success:false, message: "Account already verified"});
        }

      const otp = String(Math.floor( 100000 +  Math.random() * 900000));
      user.verifyOtp = otp;
      user.verifyOtpExpiredAt = Date.now() + 24*60*60*1000

      await user.save();

       const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to:user.email,
        subject: 'Account verification OTP',
        text: `Your OTP (One Time Password) is ${otp}. Verify your Account using this OTP.`
    }

    await transporter.sendMail(mailOptions);

     return res.json({success: true, message:"Verification OTP sent on Email"});

    } catch (error) {
         return res.json({success: false, message: error.message});
    }

}



// verify Email using OTP
export const verifyEmail = async(req,res)=>{
    const userId = req.userId; 
     const {otp} = req.body;
   
     if(!userId || !otp) {
          return res.json({success: false, message:"Missing Details" });
     }
     try {
          const user = await userModel.findById(userId);
          if(!user){
              return res.json({success: false, message:"User Not Found" });
          }
          
          if(user.verifyOtp === '' || String(user.verifyOtp) !== String(otp)){
              return res.json({success: false, message:"Invalid OTP" });
          }
          if(user.verifyOtpExpiredAt < Date.now()){
              return res.json({success: false, message:"OTP Expired. Try Again!" });
          }

          user.isAccountVerified = true;
          user.verifyOtp = '';
          user.verifyOtpExpiredAt = 0;
          await user.save();
            return res.json({success: true, message:"Email Verified Sucessfully" });        

     } catch (error) {
          return res.json({success: false, message: error.message});
     }

}

// check if user is authenticated
export const isAuthenticated = async(req,res)=>{
    try {
        return res.json({success:true, message:"Account is Authenticated"});
    } catch (error) {
      return res.json({success: false, message: error.message}); 
    }
}


// send password reset OTP
export const sendResetOTP = async(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.json({success: false, message: "Email is Required"}); 
    }
    try {
        const user  = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User Not Found"}); 
        }

      const otp = String(Math.floor( 100000 +  Math.random() * 900000));
        
       user.resetOtp = otp;
      user.resetOtpExpiredAt = Date.now() + 15*60*1000
      await user.save();

       const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to:user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP (One Time Password) for resetting your password is ${otp}. Use this OTP t proceed with resetting your password.`
    }

    await transporter.sendMail(mailOptions);

    return res.json({success:true, message:"OTP sent to your email"});
        
    } catch (error) {
        return res.json({success: false, message: error.message}); 
    }
}

// Reset User password
export const resetPassword = async(req,res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Email, OTP, new password are required"}); 
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'User Not Found'}); 
        }
        if(user.resetOtp === "" || String(user.resetOtp) !== String(otp)){
            return res.json({success: false, message: "Invalid OTP"}); 
        }
        if (user.resetOtpExpiredAt < Date.now()){   
           return res.json({success: false, message: "OTP Expired. Try Again!"}); 
        }

        const hashedPassWord = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassWord;
        user.resetOtp = ''
        user.resetOtpExpiredAt = 0
        await user.save();
    return res.json({success: true, message: "Password has been reset Successfully"}); 

    } catch (error) {
        return res.json({success: false, message: error.message}); 
        
    }

}