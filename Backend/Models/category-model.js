import mongoose from "mongoose";

const categoryShcema = new mongoose.Schema({
    name : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        default : ''
    }
},{
    timestamps : true
})
export const CategoryModel =
mongoose.model('category',categoryShcema)