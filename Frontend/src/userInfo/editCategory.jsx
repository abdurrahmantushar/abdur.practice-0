import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { uploadImage } from '../common config/uploadImage';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { toast } from 'react-toastify';

function EditCategory({ close, category, onUploadSuccess }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    _id: category._id,
    name: category.name,
    image: category.image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const res = await uploadImage(file);
    const imageUrl = res?.data?.data?.url || res?.data?.url;
    setData(prev => ({ ...prev, image: imageUrl }));
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.updateCategory,
        data
      });
      const { data: resData } = res;
      if (resData.success) {
        toast.success(resData.message);
        if (onUploadSuccess) onUploadSuccess();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50'>
      <div className='bg-white max-w-md w-full p-6 rounded-xl shadow-lg relative'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4 border-b pb-2'>
          <h2 className='text-xl font-semibold'>Edit Category</h2>
          <CgClose
            className='text-red-600 w-6 h-6 cursor-pointer hover:text-red-800'
            onClick={close}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Image */}
          <div>
            <label className='block text-sm font-medium mb-1'>Category Image</label>
            <div
              className='relative flex items-center justify-center border-2 border-dashed rounded-lg h-40 bg-gray-50 overflow-hidden cursor-pointer'
            >
              {data.image ? (
                <img
                  src={data.image}
                  alt='category'
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='text-gray-500 text-sm'>Click to upload</span>
              )}
              <input
                id='fileInput'
                type='file'
                accept='image/*'
                onChange={handleUploadChange}
                className='hidden'
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className='block text-sm font-medium mb-1'>Category Name</label>
            <input
              type='text'
              name='name'
              value={data.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-600 text-white py-2 rounded-lg font-semibold text-xl hover:bg-red-700 transition'
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
