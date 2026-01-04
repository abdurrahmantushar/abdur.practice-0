import React, { useState } from 'react'
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { toast } from 'react-toastify';
import axios from 'axios'

import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { Link, useNavigate } from 'react-router-dom';


export const RegisterPage =  () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password:""
  });

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const validValue= Object.values(formData).every(el =>el)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirm_password){
      toast.error(
      " Password & Confirm password must be same"
    )
    return
  } 
    try {
        const res = await Axios({
         ...SummaryApi.register,
         data: formData
        })
        if(res.data.error){
          toast.error(res.data.message)
        }
        if(res.data.success){
          toast.success(res.data.message)
          setFormData({
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirm_password:""
          })
          navigate('/login')
        }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
           
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor='name' className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your username"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor='email' className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor='mobile' className="block text-sm font-medium text-gray-600 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="01XXXXXXXXX"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor='password' className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className=' flex'>
              <input
                type={showPassword ? 'text' : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            <div
             onClick={()=>setShowPassword(prev => !prev)}
             className=' cursor-pointer mt-3 pl-1'>
              {
                showPassword ? (
                  <FiEye />
                ) : (

                  <FiEyeOff />
                )
              }
            </div>
            </div>
          </div>
                    <div>
            <label htmlFor='password' className="block text-sm font-medium text-gray-600 mb-1">
               Confirm Password
            </label>
            <div className=' flex'>
              <input
                type={showConfirmPassword ? 'text' : "password"}
                name="confirm_password"
                placeholder="Create a password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            <div
             onClick={()=>setShowConfirmPassword(prev => !prev)}
             className=' cursor-pointer mt-3 pl-1'>
              {
                showConfirmPassword ? (
                  <FiEye />
                ) : (

                  <FiEyeOff />
                )
              }
            </div>
            </div>
          </div>

         
          <button
            disabled={!validValue}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>

        
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to={'/login'} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );

}


