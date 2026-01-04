import { MongoGridFSChunkError } from "mongodb";
import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type : mongoose.Schema.ObjectId,
        ref : 'product'
    },
    quentity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})
export const CardProductModel = mongoose.model('cartProduct', cartProductSchema)