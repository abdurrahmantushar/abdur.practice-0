import { Router } from "express";
import {  forgotPasswordController, loginController,logoutController,refreshTokenController,registerUserController, resetPasswordController, updateUserDetails, uploadImageAvatar, userDeatils, verifyEmailController, verifyForgotOtpController } from "../controllers/user-controller.js";
import { auth } from "../middleware/auth-middleware.js";
import { upload } from "../middleware/multer-middleware.js";

export const userRoute = Router()

userRoute.post('/register',registerUserController)
userRoute.post('/verify-email',verifyEmailController)
userRoute.post('/login',loginController)
userRoute.get('/logout',logoutController)
userRoute.put('/upload-avatar',auth,upload.single('avatar'),uploadImageAvatar)
userRoute.put('/update-user',auth,updateUserDetails)
userRoute.put('/forgot-password',forgotPasswordController)
userRoute.put('/verify-forgot-otp',verifyForgotOtpController)
userRoute.put('/reset-password',resetPasswordController)
userRoute.post('/refresh-token',refreshTokenController)
userRoute.get('/user-details',auth,userDeatils)