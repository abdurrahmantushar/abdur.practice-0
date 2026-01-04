import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from 'dotenv'
dotenv.config()

import { ConnectDB } from "./config/connect-mongodb.js";
import { userRoute } from "./routes/user-routes.js";
import categoryRouter from "./routes/category-routes.js";
import uploadRouter from "./routes/uploadController.js";
import productRouter from "./routes/produtc-route.js";


const app= express()
app.use(cors({
    credentials : true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))
const PORT = process.env.PORT || 4500;
app.get("/",(req,res)=>{
    res.json({
        message : 'server is running'
    })
})

app.use('/api/user',userRoute)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/item',productRouter)

ConnectDB()

app.listen(PORT,()=>{
    console.log('server is running', PORT)
})
