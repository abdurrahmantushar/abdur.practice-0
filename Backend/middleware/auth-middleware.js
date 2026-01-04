import  jwt  from "jsonwebtoken"

export const auth = async (req, res, next)=>{
    try {
        const token = req.cookies.access_token 
        || req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({
                message: 'Access token required',
                error: true
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS)
        if(!decode){
            return res.status(401).json({
                message : 'Unauthorized Acess',
                error : true,
                success: false
            })
        }
        req.userId = decode.id

        next()
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}