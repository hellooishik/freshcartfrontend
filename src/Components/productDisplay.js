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

            {/* Product Info */}
            <h5 className="product-name">{product.name}</h5>
            <p className="product-description">{product.description}</p>
            
            {/* Product Variations */}
            {product.variations?.[0] && (
              <div className="product-variation">
  <p className="variation-type">
    {product.variations?.[0]?.type || 'Chicken Curry Cut'} | 
    {product.variations?.[0]?.pieces || (Math.random() < 0.5 ? '7-11' : '10-14')} Pieces | 
    Serves {product.variations?.[0]?.serves || (Math.random() < 0.5 ? '2-3' : '4')}
  </p>
  <p className="product-price">
    ₹{product.price?.toFixed(2)}
    {product.variations?.[0]?.mrp > product.price && (
      <>
        <span className="original-price"> ₹{product.variations[0].mrp.toFixed(2)}</span>
        <span className="discount"> {(((product.variations[0].mrp - product.price) / product.variations[0].mrp) * 100).toFixed(2)}% off</span>
      </>
    )}
  </p>
</div>
)}

            {/* Delivery Time */}
            <p className="delivery-time">⚡ Today in 30 mins</p>

            {/* Add to Cart Button */}
            <button className="add-to-cart-btn">+</button>
          </div>
        ))}
      </div>

      <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default ProductDisplay;
