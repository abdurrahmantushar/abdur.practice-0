import { Outlet } from "react-router-dom"
import { HeaderBox } from "./components/header"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch} from "react-redux"

import { GetUserDetails } from "./common config/getUserDetails";
import { setUserDetails } from "./store/userSlice";

export const App=()=> {
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    if(!token) return;
    const restoreUser=async ()=>{
    const user = await GetUserDetails()
    if(user?._id){
      dispatch(setUserDetails(user))
    }
  }
 restoreUser()
  },[])
    return (
      <div>
        <HeaderBox/>
        <main className=" min-h-[85.6vh] bg-[#FFFDF5]">
        <Outlet/>
        </main>/
        <ToastContainer/>
      </div>
    )
}


