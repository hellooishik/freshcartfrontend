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

  useEffect(() => {
    console.log('API URL:', API_URL);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(response.data);

        const similarResponse = await axios.get(`${API_URL}/products?category=${response.data.category?._id}`);
        setSimilarProducts(similarResponse.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
    // Cart logic can be added here
  };

  if (loading) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const imageUrl = product?.image?.startsWith('http') ? product.image : `${API_URL}${product?.image}`;

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6">
            <img src={imageUrl} alt={product?.name} className="img-fluid rounded shadow" />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <h1 className="mb-3">{product?.name || 'No Name Available'}</h1>
            <p className="text-muted">{product?.description || 'No Description'}</p>
            <h4 className="text-primary">Starting at ₹{product?.variations?.[0]?.discountedPrice || 'N/A'}</h4>

            {/* Variations */}
            <div className="variations">
              {product?.variations?.map((variation, index) => (
                <div key={index} className="variation-option my-2 p-2 border rounded">
                  <span>{variation?.type} - ₹{variation?.discountedPrice} </span>
                  {variation?.mrp > variation?.discountedPrice && (
                    <span className="discount">
                      (Save {(((variation?.mrp - variation?.discountedPrice) / variation?.mrp) * 100).toFixed(2)}%)
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button className="btn btn-danger mt-3" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <p className="text-success mt-3">Delivery in 1200 mins</p>
          </div>
        </div>

        {/* Tabs Section */}
        <ul className="nav nav-tabs mt-5" id="productTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#whatYouGet" type="button" role="tab">What You Get</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#sourcing" type="button" role="tab">Sourcing</button>
          </li>
        </ul>

        <div className="tab-content mt-3">
          {/* What You Get Section */}
          <div className="tab-pane fade show active" id="whatYouGet" role="tabpanel">
            {product?.whatYouGet?.length > 0 ? (
              <ul className="list-group">
                {product.whatYouGet.map((item, index) => (
                  <li key={index} className="list-group-item">✅ {item}</li>
                ))}
              </ul>
            ) : (
              <p>No items available in "What You Get".</p>
            )}
          </div>

          {/* Sourcing Section */}
          <div className="tab-pane fade" id="sourcing" role="tabpanel">
            <p>{product?.sourcing || 'No sourcing information available'}</p>
          </div>
        </div>

        {/* Similar Products Section */}
        <h3 className="mt-5">You may also like</h3>
<div className="row">
  {similarProducts?.length > 0 ? (
    similarProducts.slice(0, 4).map((similar, index) => (
      <div key={index} className="col-md-3 mb-4">
        <div className="card">
          <img src={`${API_URL}${similar.image}`} alt={similar.name} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{similar.name}</h5>
            <p className="text-success">₹{similar.variations?.[0]?.discountedPrice || similar.price}</p>
            <button className="btn btn-primary" onClick={() => handleAddToCart(similar)}>Add to Cart</button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No similar products found.</p>
  )}
</div>

        <Footer/>
      </div>
    </>
  );
};

export default Productapt;
