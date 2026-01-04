import React, { useState } from 'react'
import UploadCategory from './uploadCategory';
import { useEffect } from 'react';


import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import EditCategory from './editCategory';

import { toast } from 'react-toastify';

export const Category=()=> {
  const [openUploadCategory,setOpenUploadCategory]=useState(false)
  const [loading , setLoading] = useState(false)
  const [categoryData,setCategoryData] = useState([])
  const [openEdit,setOpenEdit]=useState(false)
  const [openConfirmBox,setOpenConfirmBox]=useState(false)
  const [deleteCategory,setDeleteCategory]=useState({
    _id:''
  })
  const [editData,setEditData]=useState({
    name : '',
    image : ''
  })
  const getCategory = async ()=>{
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getCategory,

      })
      
      const {data:resData }=res;
      if(resData.success){
        setCategoryData(resData.data || [])
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getCategory()
  },[])
  const handleDeleteCategory = async()=>{
    try {
      const res = await Axios({
        ...SummaryApi.deleteCategory,
        data:deleteCategory
      })
      console.log('-----------',res)
      const {data:resData}=res
      if(resData.success){
        toast.success(resData.message)
        getCategory()
        setOpenConfirmBox(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className='p-2'>
      <div className=' flex p-2 font-semibold bg-gray-200 shadow-lg items-center justify-between px-2'>
        <h2> Category </h2>
        <button
        onClick={()=>setOpenUploadCategory(true)} 
        className="text-[15px] px-3 py-2 rounded-lg bg-red-500 hover:bg-red-900 cursor-pointer text-white font-medium"> Add Category</button>
      </div>

        
<div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-5  '>
  {categoryData.map((category) => (
    <div key={category._id} className=' p-1 group cursor-pointer rounded shadow bg-amber-100/30 bg-bottom'>
      <img
        src={category.image}
        alt={category.name}
        className=' object-scale-down lg:w-40 lg:h-60 w-70 h-50  rounded mt-2 lg:ml-6'
      />
      <h3 className='mt-2 text-center font-medium'>{category.name}</h3>
        <div className=' hidden group-hover:flex items-center justify-between cursor-pointer px-2 text-[12px] '>
                <button 
                onClick={()=>{setOpenEdit(true)
                      setEditData(category)
                }}
                className='w-16 border cursor-pointer border-blue-500 text-Black py-0.5 rounded-lg font-semibold hover:bg-blue-300 transition'> Edit </button>
                <button 
                onClick={()=>{setOpenConfirmBox(true) 
                  setDeleteCategory(category)}}
                className='w-16 border cursor-pointer border-red-500 text-Black py-0.6 rounded-lg font-semibold hover:bg-red-300 transition'> Delete </button>
        </div>
    </div>
  ))}
</div>

      {
        openUploadCategory && (
          <UploadCategory  
          onUploadSuccess={getCategory}
          close={()=>setOpenUploadCategory(false)}/>
        )
      }
      {
        openEdit && (
          <EditCategory
          onUploadSuccess={getCategory}  
          category={editData}
          close={()=>setOpenEdit(false)}/>
        )
      }
      {
        openConfirmBox && (
          <ConfirmBox
           
          confirm={handleDeleteCategory}
          cancle={()=>setOpenConfirmBox(false)}/>
        )
      }
    </section>
  )
}


