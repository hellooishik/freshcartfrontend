import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../css/productDetails.css';
import Header from '../Components/header';
import Footer from '../Components/footer';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : process.env.REACT_APP_API_URL_PROD;

const Productapt = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

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
      toast.error('Failed to create session. Try again.');
      return null;
    }
  };

  const handleAddToCart = async (targetProduct, variationId = null) => {
    const selectedVar = variationId || selectedVariation;

    if (!selectedVar && targetProduct.variations?.length > 0) {
      toast.warning('Please select a variation before adding to cart.');
      return;
    }

    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = await getSessionId();
      if (!sessionId) return;
    }

    const variationObj = targetProduct.variations?.find(v => v._id === selectedVar);
    const price = variationObj?.price || targetProduct.price;

    try {
      const response = await axios.post(`${API_URL}/cart/add`, {
        sessionId,
        productId: targetProduct._id,
        variation: selectedVar,
        quantity: 1,
        price
      });

      if (response.status === 200) {
        toast.success(`${targetProduct.name} added to cart!`);
        setTimeout(() => {
          navigate('/cart'); // 👈 Redirect to cart after toast
        }, 1500);
      } else {
        toast.error('Failed to add product to cart. Please try again.');
      }
    } catch (err) {
      console.error('Failed to add product to cart:', err?.response?.data?.message || err.message);
      toast.error('Unable to add product to cart.');
    }
  };

  if (loading) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const imageUrl = product?.image?.startsWith('http') ? product.image : `${API_URL}${product?.image}`;

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar theme="colored" />
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
                  <span className="ms-2">
                    {variation.type} - ₹{discountedPrice.toFixed(2)}
                    {variation.discount > 0 && (
                      <span className="text-danger ms-1">(Save {variation.discount}%)</span>
                    )}
                  </span>
                </div>
              );
            })}

            <button className="btn btn-danger mt-3" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <p className="text-success mt-3">Delivery in 1200 mins</p>
          </div>
        </div>

        {/* Similar Products Section */}
        <h3 className="mt-5">You may also like</h3>
        <div className="row">
          {similarProducts?.length > 0 ? (
            similarProducts.slice(0, 4).map((similar) => {
              const variation = similar.variations?.[0];
              const discountedPrice = variation
                ? variation.price - (variation.price * (variation.discount / 100))
                : similar.price;

              return (
                <div key={similar._id} className="col-md-3 mb-4">
                  <div className="card">
                    <img src={`${API_URL}${similar.image}`} alt={similar.name} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{similar.name}</h5>
                      <p className="text-success">₹{discountedPrice.toFixed(2)}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(similar, variation?._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Productapt;
