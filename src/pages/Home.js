import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homepage.css';
import LoggedInHomePage from './LoggedInHomePage';
import Header from '../Components/header';
import Hero from '../Components/hero';
import Footer from '../Components/footer';
import CustomerReviews from '../Components/CustomerReviews';
import CategorySection from '../Components/CategorySection';
import ProductDisplay from '../Components/productDisplay';
import CitiesWeServe from '../Components/CitiesWeServe'
import MeatInfoSection from '../Components/MeatInfoSection'

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);

    axios.get('http://localhost:4000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost:4000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const getImageUrl = (imagePath) => `http://localhost:4000${imagePath.replace(/\\/g, '/')}`;

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  if (user) {
    return <LoggedInHomePage user={user} products={products} categories={categories} />;
  }

  return (
    <div className="homepage-container">
      <Header />
      <Hero />
      <div className="container-fluid py-5">
        {products.length > 0 ? (
          <ProductDisplay 
            products={products} 
            getImageUrl={getImageUrl} 
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
      <CategorySection categories={categories} onCategoryClick={handleCategoryClick} />
      <CustomerReviews />
      <MeatInfoSection/>
      <CitiesWeServe />
      <Footer />
    </div>
  );
}
