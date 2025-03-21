import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import logo from "../Assets/logo.png"


export default function Header() {
  const [location, setLocation] = useState('Fetching location...');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
    
        // Ensure coordinates are valid
        if (!latitude || !longitude) {
          setLocation('Invalid coordinates');
          return;
        }
    
        // Add a custom user-agent to comply with API requirements
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
           headers: {
            'User-Agent': 'YourAppName/1.0 (your@email.com)',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch location');
            }
            return response.json();
          })
          .then((data) => {
            if (data.display_name) {
              setLocation(data.display_name);
            } else {
              setLocation('Location not available');
            }
          })
          .catch((error) => {
            console.error('Error fetching location:', error);
            setLocation('Unable to fetch location');
          });
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocation('Location access denied');
      }
    );
    

    // Fetch products for search
    axios
      .get('http://localhost:4000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold" style={{ color: '#FFC107' }} to="/">
  <img 
    src={logo}
    alt="Meatigo Logo" 
    style={{ height: '60px', marginRight: '10px' }}
  />
  <span style={{ color: 'black', fontFamily: 'serif', fontSize : 20 }}>Meatigo</span>
</Link>

        {/* Location Display */}
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
        </div>

        {/* Buttons */}
        <div className="d-flex align-items-center gap-4">
  {/* Login Link */}
  <Link className="text-dark text-decoration-none fw-semibold" to="/login">
    Login
  </Link>

  {/* Cart Link with Icon */}
  <Link className="btn btn-success d-flex align-items-center py-2 px-3" to="/cart">
    <FaShoppingCart className="me-2" /> My Cart
  </Link>
</div>

      </div>
    </nav>
  );
}