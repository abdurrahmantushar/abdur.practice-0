import React, { useState, useEffect } from 'react';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { toast } from 'react-toastify';

export const AdminProductAddPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Axios({ ...SummaryApi.getCategory });
        if (res.data.success) setCategories(res.data.data || []);
      } catch (error) {
        AxiosToastError(error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       if (!category) return setSubCategories([]);
//       try {
//         const res = await Axios({ url: `/api/sub-category/get?category=${category}`, method: 'get' });
//         if (res.data.success) setSubCategories(res.data.data || []);
//       } catch (error) {
//         AxiosToastError(error);
//       }
//     };
//     fetchSubCategories();
//   }, [category]);

  // Handle product add
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.addProduct, // addProduct API add kora lagbe SummaryApi te
        data: { name, price, stock, category, subCategory, description },
      });
      setLoading(false);

      if (res.data.success) {
        toast.success('Product added successfully!');
        // clear form
        setName('');
        setPrice('');
        setStock('');
        setCategory('');
        // setSubCategory('');
        setDescription('');
      }
    } catch (error) {
      setLoading(false);
      AxiosToastError(error);
    }
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
      <form onSubmit={handleAddProduct} className='max-w-xl'>
        <div className='mb-4'>
          <label className='block mb-1 font-semibold'>Product Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-1 font-semibold'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-1 font-semibold'>Stock</label>
          <input
            type='number'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-1 font-semibold'>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full border px-3 py-2 rounded'
            required
          >
            <option value=''>-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* <div className='mb-4'>
          <label className='block mb-1 font-semibold'>SubCategory</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full border px-3 py-2 rounded'
          
          >
            <option value=''>-- Select SubCategory --</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        </div> */}

        <div className='mb-4'>
          <label className='block mb-1 font-semibold'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};
