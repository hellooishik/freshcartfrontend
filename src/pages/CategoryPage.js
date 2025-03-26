import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/categoryPage.css';
import Header from '../Components/header';
import Footer from '../Components/footer';
import { API_URL } from '../context/config';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryResponse = await axios.get(`${API_URL}/products/category/${categoryId}`);
        setCategoryName(categoryResponse.data.name);

        const productResponse = await axios.get(`${API_URL}/products/category/${categoryId}`);
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  return (
    <div className="category-page-container">
      <Header />
      <h2>{categoryName ? `Products in ${categoryName}` : 'Products to show'}</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`${API_URL}${product.image}`} alt={product.name} />
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available in this category.</p>
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
