import { uploadImageCloud } from "../Cloudenary/image-cloud.js"

export const uploadImageController =async (req,res)=>{
    try {
        const file = req.file
        const uploadImage = await uploadImageCloud(file)
        return res.json({
            message: 'Upload done',
            success : true,
            data:uploadImage
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}