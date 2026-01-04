import jwt from 'jsonwebtoken'

export const accessToken =(userId)=>{
    const token =  jwt.sign({ id : userId}, process.env.SECRET_KEY_ACCESS,
        {expiresIn: '1d'}
    )
    return token
}