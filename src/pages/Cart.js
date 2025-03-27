import React, { useEffect, useState } from "react";
import Header from '../Components/header';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        const { data } = await axios.get(`http://localhost:4000/cart?sessionId=${sessionId}`);
        setCart(data);
        fetchProductDetails(data.products);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartData();
  }, []);

  const fetchProductDetails = async (products) => {
    try {
      const productPromises = products.map(item => 
        axios.get(`http://localhost:4000/products/${item.product}`)
      );
      const productResponses = await Promise.all(productPromises);

      const detailedProducts = productResponses.map((res, index) => ({
        ...res.data,
        quantity: products[index].quantity,
      }));

      setProductDetails(detailedProducts);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const sessionId = localStorage.getItem('sessionId');
      const { data } = await axios.post('http://localhost:4000/cart/add', { sessionId, productId, quantity });
      setCart(data);
      fetchProductDetails(data.products);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const { data } = await axios.delete(`http://localhost:4000/cart/remove/${productId}`, { data: { sessionId } });
      setCart(data);
      setProductDetails(prev => prev.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      await axios.delete('http://localhost:4000/cart/clear', { data: { sessionId } });
      setCart({ products: [], totalPrice: 0 });
      setProductDetails([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {productDetails.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <div>
            <ul>
              {productDetails.map(item => (
                <li key={item._id} className="flex items-center justify-between border-b py-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1 px-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">Price: ₹{item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  </div>
                  <button className="bg-red-500 text-white px-3 py-1 rounded ml-4" onClick={() => removeItem(item._id)}>Remove</button>
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