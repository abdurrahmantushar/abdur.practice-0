import jwt from 'jsonwebtoken'
import UserModel from '../Models/User-Model.js'

export const refreshToken = async (userId)=>{
    const token =jwt.sign(
        {id : userId},
        process.env.SECRET_KEY_REFESH,
        {expiresIn: '7d' }
    )
    await UserModel.updateOne(
        {_id : userId},
        {$set: {refresh_token : token}}
    )

    return token
}