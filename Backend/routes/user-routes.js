import { Router } from "express";
import {   loginController,logoutController,refreshTokenController,registerUserController, updateUserDetails, uploadImageAvatar, userDeatils, } from "../controllers/user-controller.js";
import { auth } from "../middleware/auth-middleware.js";
import { upload } from "../middleware/multer-middleware.js";

export const userRoute = Router()

userRoute.post('/register',registerUserController)
userRoute.post('/login',loginController)
userRoute.get('/logout',logoutController)
userRoute.put('/upload-avatar',auth,upload.single('avatar'),uploadImageAvatar)
userRoute.put('/update-user',auth,updateUserDetails)
userRoute.post('/refresh-token',refreshTokenController)
userRoute.get('/user-details',auth,userDeatils)