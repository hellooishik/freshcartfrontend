import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/productDetails.css';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : process.env.REACT_APP_API_URL_PROD;

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(response.data);

        const similarResponse = await axios.get(`${API_URL}/products?category=${response.data.category}`);
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

  const calculateDiscountedPrice = (price, discount) => {
    if (price == null || isNaN(price)) return 'N/A';
    if (discount == null || isNaN(discount)) return price.toFixed(2);
    return (price - (price * (discount / 100))).toFixed(2);
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img src={`${API_URL}${product?.image}`} alt={product?.name} className="img-fluid rounded shadow" />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h1>{product?.name}</h1>
          <p>{product?.description}</p>
          <h4 className="text-primary">Base Price: ₹{product?.price ? product.price.toFixed(2) : 'N/A'}</h4>
          the set of verteinecvec w3ill be sdda a will be set to the mian frame

          {/* Variations Section */}
          {product?.variations?.length > 0 ? (
            <div>
              <h5>Available Variations</h5>
              {product.variations.map((variation) => (
                <div key={variation._id} className="variation-option my-2 p-2 border rounded">
                  <span>{variation.type} - ₹{calculateDiscountedPrice(variation.price, variation.discount)}</span>
                  {variation.discount > 0 && (
                    <span className="text-danger"> (Save {variation.discount}%)</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No variations available.</p>
          )}

          <button className="btn btn-danger mt-3" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>

      {/* Similar Products Section */}
      <h3 className="mt-5">You may also like</h3>
      <div className="row">
        {similarProducts?.length > 0 ? (
          similarProducts.map((similar) => (
            <div key={similar._id} className="col-md-3 mb-4">
              <div className="card">
                <img src={`${API_URL}${similar.image}`} alt={similar.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{similar.name}</h5>
                  <p className="text-success">₹{similar.price ? similar.price.toFixed(2) : 'N/A'}</p>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(similar)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
