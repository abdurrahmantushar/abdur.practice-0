import { createBrowserRouter } from "react-router-dom";

import { App } from '../App'
import { HomePage } from "../frontPage/homePage";
import { Login } from "../frontPage/loging";
import { RegisterPage } from "../frontPage/registerUser";
import Dashboard from "../layouts/dashboard";
import UserProfile from "../userInfo/UserProfile";
import { MyAdress } from "../userInfo/adress";
import { MyOrder } from "../userInfo/orders";
import { Category } from "../userInfo/category";
import { SubCategory } from "../userInfo/subCategory";
import { UploadProducts } from "../userInfo/uploadProducts";
import { AdminProductPage } from "../userInfo/productPage";
import UploadCategory from "../userInfo/uploadCategory";
import { AdminProductAddPage } from "../userInfo/addProducts";
;


export const router = createBrowserRouter([
    {
        path:'/',
        element : <App/>,
        children:[
            {
                path:'',
                element: <HomePage/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<RegisterPage/>
            },
            {
                path:'dashboard',
                element:<Dashboard/>,
                children:[
                    {
                        path:'my-profile',
                        element:<UserProfile/>
                    },
                    {
                        path:'my-address',
                        element:<MyAdress/>
                    },
                    {
                        path:'my-orders',
                        element:<MyOrder/>
                    },
                    {
                        path:'my-address',
                        element:<MyAdress/>
                    },
                    {
                        path:'category',
                        element: <Category/>
                    },
                    {
                        path:'sub-category',
                        element:<SubCategory/>
                    },
                    {
                        path:'products',
                        element:<AdminProductPage/>
                    },
                    {
                        path:'upload-products',
                        element:<UploadProducts/>
                    },
                    {
                        path:'upload-category',
                        element:<UploadCategory/>
                    },
                    {
                        path:'add-item',
                        element: <AdminProductAddPage/>
                    }
                ]
            }
        ]
    }
])
