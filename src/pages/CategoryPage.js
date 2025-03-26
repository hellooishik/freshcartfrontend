import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/categoryPage.css';
import Header from '../Components/header';
import Footer from '../Components/footer';
import { API_URL } from '../context/config';
import ProductDisplay from '../Components/productDisplay';
import CitiesWeServe from '../Components/CitiesWeServe';
import MeatInfoSection from '../Components/MeatInfoSection';
import Carousel from '../Components/Carousel'

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setVisibleProducts(2);
    } else if (window.innerWidth <= 1024) {
      setVisibleProducts(3);
    } else {
      setVisibleProducts(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300 * visibleProducts, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300 * visibleProducts, behavior: 'smooth' });
  };

  const handleProductClick = (id) => navigate(`/products/${id}`);

  return (
  
    <div className="category-page-container">
        <Header />
        <Carousel/>
      <h2>{categoryName ? `Products in ${categoryName}` : 'Products to show'}</h2>

      {error ? (
        <p className="error-message">{error}</p>
      ) : products.length > 0 ? (
        <div className="product-display-container">
          <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>

          <div className="product-scroll" ref={scrollRef}>
            {products.map((product) => (
              <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
                <img
                  src={`${API_URL}${product.image}`}
                  alt={product.name || 'Product Image'}
                  className="product-img"
                  loading="lazy"
                />
                <h5 className="product-name">{product.name}</h5>
                <p className="product-description">{product.description}</p>

                {product?.variations?.[0] && (
                  <div className="product-variation">
                    <p className="variation-type">
                      {product?.variations?.[0]?.type || 'Chicken Curry Cut'} | 
                      {product?.variations?.[0]?.pieces || '7-11'} Pieces | 
                      Serves {product?.variations?.[0]?.serves || '2-3'}
                    </p>
                    <p className="product-price">
                      ₹{product?.price?.toFixed(2)}
                      {product?.variations?.[0]?.mrp > product?.price && (
                        <>
                          <span className="original-price"> ₹{product?.variations?.[0]?.mrp?.toFixed(2)}</span>
                          <span className="discount"> {(((product.variations[0].mrp - product.price) / product.variations[0].mrp) * 100).toFixed(2)}% off</span>
                        </>
                      )}
                    </p>
                  </div>
                )}

                <p className="delivery-time">⚡ Today in 30 mins</p>

                <button className="add-to-cart-btn" aria-label="Add to Cart">+</button>
              </div>
            ))}
          </div>

          <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
        </div>
      ) : (
        <p>No products available in this category.</p>
      )}
      <MeatInfoSection/>
      <CitiesWeServe />
      <Footer />
    </div>
  );
};

export default CategoryPage;