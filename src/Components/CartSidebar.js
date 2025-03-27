import React from 'react';
import '../css/cartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Your Cart</h2>
      <p>Items will be listed here...</p>
    </div>
  );
};

export default CartSidebar;