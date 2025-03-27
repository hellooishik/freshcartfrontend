import React, { useEffect, useState } from "react";
import Header from '../Components/header';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });

  // Fetch cart data
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      axios.get(`http://localhost:4000/cart?sessionId=${sessionId}`)
        .then(response => {
          setCart(response.data);
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
        });
    }
  }, []);

  // Update quantity
  const updateQuantity = (productId, variation, quantity) => {
    const sessionId = localStorage.getItem('sessionId');
    axios.post('http://localhost:4000/cart/add', { sessionId, productId, variation, quantity })
      .then(response => setCart(response.data))
      .catch(error => console.error('Error updating quantity:', error));
  };

  // Remove item from cart
  const removeItem = (productId) => {
    const sessionId = localStorage.getItem('sessionId');
    axios.delete(`http://localhost:4000/cart/remove/${productId}`, { data: { sessionId } })
      .then(response => setCart(response.data.cart))
      .catch(error => console.error('Error removing item:', error));
  };

  // Clear cart
  const clearCart = () => {
    const sessionId = localStorage.getItem('sessionId');
    axios.delete('http://localhost:4000/cart/clear', { data: { sessionId } })
      .then(() => setCart({ items: [], totalPrice: 0 }))
      .catch(error => console.error('Error clearing cart:', error));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart.items.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <div>
            <ul>
              {cart.items.map(item => (
                <li key={item._id} className="flex justify-between items-center mb-4">
                  <div>
                    <p>Product: {item.productId}</p>
                    <p>Variation: {item.variation}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={() => updateQuantity(item.productId, item.variation, item.quantity + 1)}>+</button>
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={() => updateQuantity(item.productId, item.variation, item.quantity - 1)}>-</button>
                    <button className="bg-red-500 text-white p-2 rounded ml-2" onClick={() => removeItem(item.productId)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold mt-6">Total Price: ₹{cart.totalPrice}</p>
            <button className="bg-red-500 text-white p-3 rounded mt-4" onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}
