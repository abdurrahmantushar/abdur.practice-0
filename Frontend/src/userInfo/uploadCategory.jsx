import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { uploadImage } from '../common config/uploadImage';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { toast } from "react-toastify";

function UploadCategory({ onUploadSuccess,close }) {
  const [data, setData] = useState({
    name: '',
    description: '',
    stock: '',
    image: ''
  })
  const [loading,setLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleUploadChange=async (e)=>{
    const file = e.target.files[0]
    if(!file){
        return
    }
    setLoading(true)
    const res = await uploadImage(file)
    const imageUrl = res?.data?.data?.url || res?.data?.url
    setData((preve)=>{
      return {
        ...preve,
        image:imageUrl
      }
    })
    setLoading(false)
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res =await Axios({
        ...SummaryApi.addCategory,
        data:data
      })
      const {data :resData} = res
      if(resData.success){
        toast.success(resData.message)
        if(onUploadSuccess)onUploadSuccess()
        close()
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <section className='fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50'>
      <div className='bg-white max-w-2xl w-full p-6 rounded-xl shadow-xl text-black'>

        {/* Header */}
        <div className='flex items-center justify-between border-b pb-3 mb-5'>
          <h2 className='text-xl font-semibold'>Upload Category</h2>
          <CgClose
            onClick={close}
            className='text-red-600 hover:text-red-800 w-6 h-6 cursor-pointer'
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* Category Name */}
          <div>
            <label className='block text-sm font-medium mb-1'>
              Category Name
            </label>
            <input
              required
              type="text"
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter category name'
              className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium mb-1'>
              Description
            </label>
            <textarea
              
              name='description'
              value={data.description}
              onChange={handleChange}
              placeholder='Write category description'
              rows={3}
              className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none resize-none'
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className='block text-sm font-medium mb-1'>
              Stock Quantity
            </label>
            <input
              disabled={!data.name}
              type="number"
              name='stock'
              value={data.stock}
              onChange={handleChange}
              placeholder='Enter stock quantity'
              className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>

<div>
  <label className='block text-sm font-medium mb-1'>
    Category Image
  </label>

  <label className='relative flex items-center justify-center
    border-2 border-dashed rounded-lg h-40
    bg-gray-50 cursor-pointer hover:bg-gray-100 overflow-hidden'
  >
    {data.image ? (
      <img
        src={data.image}
        alt="category"
        className="absolute inset-0 w-38 h-38 p-2 ml-50 "
      />
    ) : (
      <span className='text-gray-500 text-sm'>
        Click to upload image
      </span>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handleUploadChange}
      required
      className="hidden"
    />
  </label>
</div>


          <div className='flex justify-end gap-3 pt-4'>
            <button
              type='button'
              onClick={close}
              className='px-4 py-2 border rounded-lg hover:bg-gray-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
            >
              {
                loading ? 'Uploading.....': 'Save Category'
              }
              
            </button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default UploadCategory
