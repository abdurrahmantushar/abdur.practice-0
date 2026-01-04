import React, { useEffect, useState } from 'react';
import { SummaryApi } from '../common config/summayApi';
import { Axios } from '../common config/axiox';
import { AxiosToastError } from '../common config/axiosToastEross';
import { AdminProductAddPage } from './addProducts';
import { Link } from 'react-router-dom';


export const AdminProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await Axios({ ...SummaryApi.getCategory });
      if (res.data.success) setCategories(res.data.data || []);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const res = await Axios({
        url: `/api/product/get?category=${categoryId}`, // backend e query param expect korbe
        method: 'get',
      });
      console.log('--------------',res)
      if (res.data.success) setProducts(res.data.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // When category changes
  useEffect(() => {
    if (selectedCategory) fetchProductsByCategory(selectedCategory);
    else setProducts([]);
  }, [selectedCategory]);

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>
      Products
      <Link to={'/dashboard/add-item'}> Add Items </Link>
      </h2>

      {/* Category Selector */}
      <div className='mb-4'>
        <label className='mr-2 font-semibold'>Select Category:</label>
        <select
          className='border px-2 py-1 rounded'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>-- Select --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-4 py-2 border'>Name</th>
                <th className='px-4 py-2 border'>Price</th>
                <th className='px-4 py-2 border'>Stock</th>
                <th className='px-4 py-2 border'>Published</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className='px-4 py-2 border'>{product.name}</td>
                  <td className='px-4 py-2 border'>{product.price}</td>
                  <td className='px-4 py-2 border'>{product.stock}</td>
                  <td className='px-4 py-2 border'>{product.publish ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
