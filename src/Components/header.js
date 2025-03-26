import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaSearch, FaMapMarkerAlt, FaBars } from 'react-icons/fa';
import logo from "../Assets/logo.png";
import { API_URL } from '../context/config';


export default function Header() {
  const [location, setLocation] = useState('Fetching location...');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (!latitude || !longitude) {
          setLocation('Invalid coordinates');
          return;
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
          headers: { 'User-Agent': 'YourAppName/1.0 (your@email.com)' },
        })
          .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch location');
            return response.json();
          })
          .then((data) => {
            setLocation(data.display_name || 'Location not available');
          })
          .catch(() => setLocation('Unable to fetch location'));
      },
      () => setLocation('Location access denied')
    );

    // Fetch products and categories
    axios.get('http://localhost:4000/products')
      .then((response) => setProducts(response.data))
      .catch(() => console.error('Error fetching products'));

    axios.get('http://localhost:4000/categories')
      .then((response) => setCategories(response.data))
      .catch(() => console.error('Error fetching categories'));
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredProducts = searchTerm
    ? products.filter(product => product.name.toLowerCase().includes(searchTerm))
    : [];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo and Brand */}
        <Link className="navbar-brand fw-bold" style={{ color: '#FFC107' }} to="/">
          <img src={logo} alt="Meatigo Logo" style={{ height: '60px', marginRight: '10px' }} />
          <span style={{ color: 'black', fontFamily: 'serif', fontSize: 20 }}>Meatigo</span>
        </Link>

        {/* Location */}
        <div className="d-flex align-items-center">
          <FaMapMarkerAlt className="text-danger me-2" />
          <div>
            <span className="fw-bold">Delivery in 8 minutes</span>
            <p className="mb-0 text-muted" style={{ fontSize: '14px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {location}
            </p>
          </div>
        </div>

{/* Search Bar */}
<div className="position-relative" style={{ width: '40%' }}>
  <input
    type="text"
    className="form-control rounded-pill p-2"
    placeholder="Search for products..."
    value={searchTerm}
    onChange={handleSearch}
  />
  <FaSearch className="position-absolute" style={{ top: '50%', right: '15px', transform: 'translateY(-50%)' }} />
  
  {filteredProducts.length > 0 && (
    <div className="position-absolute bg-white border mt-2 w-100 shadow-sm" style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 10 }}>
      {filteredProducts.map(product => (
        <Link 
          key={product._id}
          className="d-flex align-items-center p-2 text-dark text-decoration-none border-bottom"
          to={`/products/${product._id}`}
          onClick={() => setSearchTerm('')} // Clear search on click
        >
          {/* Product Image */}
          <img
            src={`http://localhost:4000${product.image}`}
            alt={product.name}
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}
          />
          {/* Product Name */}
          <span>{product.name}</span>
        </Link>
      ))}
    </div>
  )}
</div>

        {/* Categories Dropdown */}
        <div className="position-relative">
          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaBars className="me-2" /> Categories
          </button>
          {showDropdown && (
            <div className="position-absolute bg-white border mt-2 p-3 shadow-sm" style={{ width: '300px', zIndex: 10 }}>
              {categories.map(category => (
          <Link
          key={category._id}
          to={`/category/${category._id}`}
          className="d-flex align-items-center text-dark text-decoration-none mb-2"
          onClick={() => setShowDropdown(false)} // Close dropdown on category click
        >
          <img
            src={`${API_URL}${category.image}`}
            alt={category.name}
            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
          />
          {category.name}
        </Link>
              ))}
            </div>
          )}
        </div>

        {/* Login and Cart */}
        <div className="d-flex align-items-center gap-4">
          <Link className="text-dark text-decoration-none fw-semibold" to="/login">Login</Link>
          <Link className="btn btn-success d-flex align-items-center py-2 px-3" to="/cart">
            <FaShoppingCart className="me-2" /> My Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
