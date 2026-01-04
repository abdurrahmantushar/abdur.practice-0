
import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    name:{
        type: String,
        required : [true,'Provide a Name']
    },
    email:{
        type : String,
        required: [true,'Provide an E-mail'],
        unique : true
    },
    password:{
        type : String,
        required: [true,'Provide a password']
    },
    avatar : {
        type: String,
        default: ''
    },
    mobile:{
        type : String,
        default: null
    },
    refresh_token:{
        type : String,
        default : ''
    },
    verify_email: {
        type : Boolean,
        default : false
    },
    last_login_date :{
        type : Date,
        default : ''
    },
    status :{
        type : String,
        enum : ['Active','Inactive','Suspended'],
        default : 'Active'
    },
    address_details : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'adress'
        }
    ],
    shopping_cart : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ],
        order_history : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ],
    forgot_password_otp : {
        type : String,
        default : null
    },
    forgot_password_expiry : {
        type : Date ,
        default : ''
    },
    role : {
        type : String,
        enum : ['ADMIN', 'USER'],
        default : 'USER'
    }
    },{
        timestamps :true
    })
const UserModel = mongoose.model('User',userShema)
export default UserModel
