import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { logout } from '../store/userSlice';
import { toast } from 'react-toastify';
import { RegisterPage } from '../frontPage/registerUser';
import { isAdmin } from '../common config/AdminIS';

export const HeaderBox = () => {
  
  const dispatch=useDispatch() 
  const navigate = useNavigate()
  const location = useLocation()
  
  const user = useSelector((state)=> state?.user)
  const [openUserMenu,setOpenUserMenu]=useState(false)
  
  useEffect(() => {
  setOpenUserMenu(false);
}, [location.pathname]);


  useEffect(() => {
  setOpenUserMenu(false);
  }, [user?._id]);

      const handleLogout= async()=>{
        try {
          const res = await Axios({
            ...SummaryApi.logout
          })
          if(res.data.success){
            dispatch(logout())
            localStorage.clear()
            toast.success(res.data.message)
          }
          navigate('/login')
        } catch (error) {
          AxiosToastError(error)
        }
      }

  return (
<header className='sticky top-0 z-40 bg-white'>
  <div className="h-20 flex items-center justify-between px-10">
           
           {
            user._id &&(
            <Link to={'/dashboard/category'} className="flex gap-1 text-[15px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
            Category
            </Link>

            )
           }
              {
                user._id && (

              <Link to={'/dashboard/my-profile'} className="flex gap-1 text-[15px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
                      
                      Update Proflie
              </Link>
                )
              }      
                    
        {
          isAdmin(user.role) && (
            
          
        <Link to={'/dashboard/products'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
        
          Products
        </Link>

        
          )
        }
                {
          isAdmin(user.role) && (
            

                <Link to={'/dashboard/my-orders'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
                  
                  Orders
                </Link>
        
          )
        }
    <div className='flex items-center gap-4'>

        {
          user._id ?(
        <button 
        onClick={handleLogout}
        className="text-[15px] px-3 py-2 rounded-lg hover:bg-red-50 cursor-pointer text-red-500 font-medium">
          Logout
        </button>

          ):(
            
            <Link to={'/register'}
            className=' font-bold font-mono text-xl '
            >Register</Link>
          )
        }

    </div>
  </div>

  {/* Mobile Search */}

</header>

  );
};
