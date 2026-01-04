import argon2 from 'argon2'
import  jwt  from 'jsonwebtoken'

import UserModel from '../Models/User-Model.js'
import { accessToken } from '../tokens/accessToken.js'
import { refreshToken } from '../tokens/refreshToken.js'
import { uploadImageCloud } from '../Cloudenary/image-cloud.js'







export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(404).json({
                message: 'provide valid name, email & password',
                error: true,
                success: false
                
            })
        }
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.json({
                message: ' Email already exist',
                error: true,
                success: false
            })
        }
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        })
        
        const payload = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new UserModel(payload)
        const save = await newUser.save()


        return res.json({
            message: 'User created Successfully',
            error : false,
            success: true,
            data : save
        })

    } catch (error) {
        console.error('Resgister error',error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export const loginController= async (req,res)=>{
    try {
        const { email, password}= req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : 'User not found',
                error : true,
                success : false
            })
        }
        if(user.status !== 'Active'){
            return res.status(400).json({
                message : 'Your account unactive please contact Admin',
                error : true,
                success : false
            })
        }
        const checkPassword = await argon2.verify(user.password, password)
        if(!checkPassword){
            return res.status(400).json({
                message : 'Write right password',
                error : true,
                success : false
            })
        }
         const access_Token = await accessToken(user._id)
         const refresh_Token = await refreshToken(user._id)

         const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date: new Date()
         })
         const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "none"
         }
         res.cookie('access_token',access_Token, cookieOption)
         res.cookie('refresh_token',refresh_Token,cookieOption)

         return res.status(200).json({
            message: ' Login successful',
            error : false,
            success : true,
            data: {
            accessToken: access_Token,
            refreshToken: refresh_Token
            }
         })
    } catch (error) {
            return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const logoutController = async (req, res)=>{
    try {
        const userId = req.userId
        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "none"
         }
        res.clearCookie('access_token',cookieOption)
        res.clearCookie('refresh_token',cookieOption)
        await UserModel.findByIdAndUpdate(userId,
            {$set:{refresh_token : ''}})
        return res.json({
            message : 'Logout Successfull',
            error: false,
            success: true

        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const uploadImageAvatar = async (req,res)=>{
    try {
        const userId = req.userId
        const image = req.file
        const upload = await uploadImageCloud(image)
        await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return res.json({
            message : 'Upload successful',
            success : true,
            data:{
                _id : userId,
                avatar : upload.url
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const updateUserDetails= async (req,res)=>{
    try {
        const userId = req.userId
        const {name, email, password, mobile, address} = req.body
        
        if ( !name && !email && !password && !mobile && !address) {
        return res.status(400).json({
        message: 'Provide at least one field to update'
        })
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true
            })
        }

        let hashedPassword = ''
        if(password){
            hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        })
        }
        let updateEmail=''
        if(email && email !== user.email){
            const emailExist = await UserModel.findOne({email})
            if(emailExist){
                return res.status(400).json({
                    message: 'Email already exists',
                    error: true,
                    success: false
                })
            }
            updateEmail=email
            user.verify_email = false
            const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${user._id}`
            await sendEmail({
                sendTo: email,
        subject: 'Verify your new email',
        html: VerifyEmailTemplate({
            name: name || user.name,
            url: verifyEmailUrl
            })
    
            })
        }
         const updateUser=await UserModel.findByIdAndUpdate(userId,{
            ...(name && {name:name}),
            
            ...(email && {email:updateEmail}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashedPassword}),
            ...(address && { address_details:[...user.address_details,address]}),

        })
        return res.json({
            message :"Update sucessfull",
            error : false,
            success:true,
            data : updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const refreshTokenController = async (req,res)=>{
    try {
        const refreshToken= req.cookies.access_token 
        || req.headers.authorization?.split(" ")[1]

        if(!refreshToken){
            return res.status(400).json({
                message : 'Unauthorized Acess',
                erorr : true
            })
        }
        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFESH)
        if(!verifyToken){
            return res.status(401).json({
                message : 'Token expierd',
                error : true
            })
        }
        const userId = verifyToken.id
        const newAccessToken = accessToken(userId)
        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "none"
         }
        res.cookie('accessToken',newAccessToken,cookieOption)
        return res.json({
            message : 'AcessToken create Successful',
            erorr: false
        })
    } catch (error) {
            return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const userDeatils = async(req,res)=>{
    try {
        const userId = req.userId
        const user = await UserModel.findById(userId).select('-password -refresh_token')
        return res.json({
            message: 'User Deatils',
            data: user,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}