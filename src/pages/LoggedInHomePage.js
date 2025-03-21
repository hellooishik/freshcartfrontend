import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoggedInHomePage({ user, products = [], categories = [] }) {
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-5">Loading user data...</p>;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-success" to="/">FreshCart</Link>
          <div className="d-flex gap-3">
            <div className="dropdown">
              <button
                className="btn btn-outline-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                {user?.name || "User"}
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
            <Link className="btn btn-success" to="/cart">Cart</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section text-center py-5 bg-success text-white d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 fw-bold">Welcome Back, {user?.name || "User"}!</h1>
        <p className="lead">Shop fresh groceries with personalized recommendations!</p>
      </div>

      {/* Categories Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Shop by Category</h2>
        {categories.length > 0 ? (
          <div className="row g-3">
            {categories.map(category => (
              <div className="col-md-3" key={category._id}>
                <div className="category-card p-4 text-center bg-light shadow-sm rounded border">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No categories available.</p>
        )}
      </div>

      {/* Featured Products Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Recommended for You</h2>
        {products.length > 0 ? (
          <div className="row g-3">
            {products.map(product => (
              <div className="col-md-3" key={product._id}>
                <div className="product-card p-3 text-center bg-white shadow-sm rounded border position-relative">
                  <img src={product.image} alt={product.name} className="w-100 rounded-top" />
                  <div className="p-3">
                    <h5 className="fw-bold">{product.name}</h5>
                    <p className="text-muted">${product.price}</p>
                    <button className="btn btn-success w-100">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </div>
  );
}
