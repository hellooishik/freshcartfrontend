import React from 'react';
import '../css/cartSidebar.css';

const CartSidebar = ({ isOpen, onClose, cartItems }) => {
  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item._id}>
              {item.name} - ₹{item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartSidebar;
