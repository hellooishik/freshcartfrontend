import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/categoryPage.css';
import Header from '../Components/header';
import Footer from '../Components/footer';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:4000/products?category=${categoryId}`);
        setProducts(productResponse.data);

        const categoryResponse = await axios.get(`http://localhost:4000/categories/${categoryId}`);
        setCategoryName(categoryResponse.data.name);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="category-page-container">
      <Header />
      <h2>{categoryName ? `Products in ${categoryName}` : 'Products to show'}</h2>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`http://localhost:4000${product.image}`} alt={product.name} />
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
