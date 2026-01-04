import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-toastify";

import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../common config/getUserDetails";
import { setUserDetails } from "../store/userSlice";

import { useDispatch} from "react-redux"

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const res = await Axios({
             ...SummaryApi.login,
             data: formData
            })
            if(res.data.error){
              toast.error(res.data.message)
            }
            if(res.data.success){
              toast.success(res.data.message)

              localStorage.setItem('accessToken',res.data.data.accessToken);
              localStorage.setItem('refreshToken',res.data.data.refreshToken)
              
              setFormData({
                email: "",
                password: "",
                
              })
              const user = await GetUserDetails();
              if(user?._id){
                dispatch(setUserDetails(user))
              }
              navigate('/')
 

            }
        } catch (error) {
          AxiosToastError(error)
        }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login 
        </h2>

        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
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

          

          
          <button
           
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
