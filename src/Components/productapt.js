import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/productDetails.css';
import Header from '../Components/header';
import Footer from '../Components/footer';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : process.env.REACT_APP_API_URL_PROD;

const Productapt = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(productResponse.data);

        const similarResponse = await axios.get(`${API_URL}/products?category=${productResponse.data.category?._id}`);
        setSimilarProducts(similarResponse.data);

        setSelectedVariation(productResponse.data.variations?.[0]?._id || null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const getSessionId = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/session`);
      const sessionId = response.data.sessionId;
      localStorage.setItem('sessionId', sessionId);
      return sessionId;
    } catch (error) {
      console.error('Error generating session:', error);
      alert('Failed to create a session. Please try again.');
      return null;
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariation) {
      alert('Please select a variation before adding to cart.');
      return;
    }
  
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = await getSessionId();
      if (!sessionId) return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/cart/add`, {
        sessionId,
        productId: product._id,
        variation: selectedVariation,
        quantity: 1,
        price: product.variations.find(v => v._id === selectedVariation)?.price || product.price,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 200) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } catch (err) {
      console.error('Failed to add product to cart:', err?.response?.data?.message || err.message);
      alert('Error: ' + (err?.response?.data?.message || 'Unable to add product.'));
    }
  };

  if (loading) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const imageUrl = product?.image?.startsWith('http') ? product.image : `${API_URL}${product?.image}`;

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img src={imageUrl} alt={product?.name} className="img-fluid rounded shadow" />
          </div>

          <div className="col-md-6">
            <h1 className="mb-3">{product?.name || 'No Name Available'}</h1>
            <p className="text-primary">{product?.description || 'No Description'}</p>
            <h4 className="text-primary">Starting at ₹{product.price || 'N/A'}</h4>

            {product?.variations?.map((variation) => {
              const discountedPrice = variation.price - (variation.price * (variation.discount / 100));
              return (
                <div key={variation._id} className="variation-option my-2 p-2 border rounded">
                  <input
                    type="radio"
                    name="variation"
                    checked={selectedVariation === variation._id}
                    onChange={() => setSelectedVariation(variation._id)}
                  />
                  <span>{variation.type} - ₹{discountedPrice.toFixed(2)} {variation.discount > 0 && <span className="text-danger">(Save {variation.discount}%)</span>}</span>
                </div>
              );
            })}

            <button className="btn btn-danger mt-3" onClick={handleAddToCart}>Add to Cart</button>
            <p className="text-success mt-3">Delivery in 1200 mins</p>
          </div>
        </div>

        <h3 className="mt-5">You may also like</h3>
        <div className="row">
          {similarProducts?.length > 0 ? (
            similarProducts.slice(0, 4).map((similar) => (
              <div key={similar._id} className="col-md-3 mb-4">
                <div className="card">
                  <img src={`${API_URL}${similar.image}`} alt={similar.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{similar.name}</h5>
                    <p className="text-success">₹{similar.variations?.[0]?.discountedPrice || similar.price}</p>
                    <button className="btn btn-primary" onClick={() => setSelectedVariation(similar.variations?.[0]?._id)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Productapt;