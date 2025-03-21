import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/productDisplay.css';

const ProductDisplay = ({ products, getImageUrl }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleProductClick = (id) => navigate(`/products/${id}`);

  if (!products || products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  return (
    <div className="product-display-container">
      <h2 className="bestseller-title">Bestsellers</h2>
      <p className="bestseller-subtitle">Most popular products near you!</p>
      <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
      <div className="product-scroll" ref={scrollRef}>
        {products.map((product) => (
          <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
            <img src={getImageUrl(product.image)} alt={product.name} className="product-img" />
            <h5 className="product-name">{product.name}</h5>
            <p className="product-description">{product.description}</p>
            {product.variations?.map((variation, index) => (
  <div key={index} className="product-variation">
    <p className="variation-type">{variation.type}</p>
    <p className="product-price">
      ₹{variation.discountedPrice?.toFixed(2)}
      {variation.mrp > variation.discountedPrice && (
        <>
          <span className="original-price"> ₹{variation.mrp.toFixed(2)}</span>
          <span className="discount"> {(((variation.mrp - variation.discountedPrice) / variation.mrp) * 100).toFixed(2)}% off</span>
        </>
      )}
    </p>
  </div>
))}
            <p className="delivery-time">⚡ Today in 90 mins</p>
            <button className="add-to-cart-btn">+</button>
          </div>
        ))}
      </div>
      <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default ProductDisplay;