import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import { useDispatch, useSelector } from 'react-redux';
import { SummaryApi } from '../common config/summayApi';
import { Axios } from '../common config/axiox';
import { AxiosToastError } from '../common config/axiosToastEross';
import { updataAvatar } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const UserAvatarEdit=({close})=> {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLodaing]= useState(false)

  const handleUploadAvatar = async(e)=>{
    const file = e.target.files[0]
    if(!file){
      return
    }
    const formData = new FormData()
    formData.append('avatar',file)
    
    try {
      setLodaing(true)
      const res= await Axios({
      ...SummaryApi.upload_avatar,
      data:formData
    })
    const {data :resData}=res
    dispatch(updataAvatar(resData.data.avatar))
    } catch (error) {
      AxiosToastError(error)
    }finally{

      setLodaing(false)
    } 
  }
  return (
    <section className='fixed inset-0 bg-gray-900/50 flex items-center justify-center'>
      <div className='max-w-sm w-full bg-gray-200 rounded-xl p-6 flex flex-col items-center gap-4 shadow-lg'>
        <CgClose onClick={close} className='ml-auto  text-red-600 hover:text-red-800 w-12 h-7'/>
        <div className=' w-32 h-32 bg-gray-200 flex items-center justify-center rounded-xl overflow-hiddendrop-shadow-md '>
          
          {user.avatar ? (
            <img
                alt={user.name}
                src={user.avatar}
                className='w-full h-full object-cover'
                />
                ) : (
                <FaUser className='text-gray-400 text-6xl' />
                )}
                </div>
                <form>
                <label htmlFor="photo">
                <div className='px-4 py-1 bg-red-600 text-white rounded-lg font-semibold  hover:bg-red-700 transition'>
                    {
                      loading? 'Loading...': "Upload"
                    }
                    
                </div>
                </label>
                <input onChange={handleUploadAvatar} type="file" id='photo' className='hidden' />
            </form>
        </div>
    </section>
  )
}

export default UserAvatarEdit;
