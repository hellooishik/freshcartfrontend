import React, { useEffect, useState } from "react";
import Header from '../Components/header';
import axios from 'axios';
import CartSidebar from "../Components/CartSidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : process.env.REACT_APP_API_URL_PROD;

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        const { data } = await axios.get(`${API_URL}/cart?sessionId=${sessionId}`);
        const products = data.products || [];

        setCart({
          products,
          totalPrice: data.totalPrice || products.reduce((acc, item) => acc + item.price * item.quantity, 0),
        });

        openSidebar();
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartData();
  }, []);

  const updateQuantity = async (productId, quantity, variation) => {
    if (quantity < 1) return;

    try {
      const sessionId = localStorage.getItem('sessionId');
      const { data } = await axios.post(`${API_URL}/cart/add`, {
        sessionId,
        productId,
        quantity,
        variation
      });

      const products = data.products || [];

      setCart({
        products,
        totalPrice: data.totalPrice || products.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });

      toast.success("Cart updated");
      openSidebar();
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const { data } = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        data: { sessionId },
      });

      const products = data.cart?.products || [];

      setCart({
        products,
        totalPrice: data.cart?.totalPrice || products.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      await axios.delete(`${API_URL}/cart/clear`, {
        data: { sessionId },
      });
      setCart({ products: [], totalPrice: 0 });
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const responsiveStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1500} />
      <Header />
      <div style={containerStyle}>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "24px" }}>Shopping Cart</h1>

        {cart.products.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <div style={responsiveStyle}>
            {cart.products.map((item, index) => {
              const product = item.productId;
              if (!product) return null;

              const imageUrl = product.image?.startsWith("http") ? product.image : `${API_URL}${product.image}`;

              return (
                <div key={index} style={{
                  display: 'flex', flexDirection: 'column', border: '1px solid #e5e7eb', borderRadius: '12px',
                  padding: '16px', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <img src={imageUrl} alt={product.name} style={{ width: '96px', height: '96px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h2 style={{ margin: 0, fontSize: '18px' }}>{product.name}</h2>
                      <p style={{ margin: '4px 0' }}>₹{item.price}</p>
                      {item.variation && (
                        <p style={{ fontSize: '13px', color: '#9ca3af' }}>Variation: {item.variation}</p>
                      )}
                      <label style={{ fontSize: '14px', marginTop: '8px' }}>Qty:
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(product._id, parseInt(e.target.value), item.variation)}
                          style={{ marginLeft: '8px', padding: '4px 6px' }}
                        >
                          {[...Array(10).keys()].map(n => (
                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <button
                      onClick={() => removeItem(product._id)}
                      style={{ background: '#ef4444', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '6px' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Price: ₹{cart.totalPrice}</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={clearCart}
                  style={{ background: '#ef4444', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px' }}
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => toast.success("Proceeding to checkout...")}
                  style={{ background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px' }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        cartItems={cart.products
          .filter(item => item.productId)
          .map(item => ({
            name: item.productId.name,
            price: item.price,
            quantity: item.quantity
          }))}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '360px',
          maxWidth: '100%',
          backgroundColor: '#fff',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
          padding: '20px',
          transition: 'transform 0.3s ease-in-out',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          zIndex: 1000,
        }}
      />
    </div>
  );
}
