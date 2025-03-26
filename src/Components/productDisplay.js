import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/productDisplay.css';

const ProductDisplay = ({ products, getImageUrl }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setVisibleProducts(2);
    } else if (window.innerWidth <= 1024) {
      setVisibleProducts(3);
    } else {
      setVisibleProducts(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300 * visibleProducts, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300 * visibleProducts, behavior: 'smooth' });
  };

  const handleProductClick = (id) => navigate(`/products/${id}`);

  if (!products || products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  return (
    <div className="product-display-container">
      <h2 className="bestseller-title">Bestsellers</h2>
      <p className="bestseller-subtitle">Most popular products near you!</p>

      {/* Left Scroll Button */}
      <button className="scroll-btn left" onClick={scrollLeft} aria-label="Scroll Left">
        &lt;
      </button>

      {/* Product List */}
      <div className="product-scroll" ref={scrollRef}>
        {products.map((product) => (
          <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
            <img
              src={getImageUrl(product.image)}
              alt={product.name || 'Product Image'}
              className="product-img"
              loading="lazy"
            />
            <h5 className="product-name">{product.name}</h5>
            <p className="product-description">{product.description}</p>

            {/* Product Variations */}
            {product?.variations?.[0] && (
              <div className="product-variation">
                <p className="variation-type">
                  {product?.variations?.[0]?.type || 'Chicken Curry Cut'} | 
                  {product?.variations?.[0]?.pieces || '7-11'} Pieces | 
                  Serves {product?.variations?.[0]?.serves || '2-3'}
                </p>
                <p className="product-price">
                  ₹{product?.price?.toFixed(2)}
                  {product?.variations?.[0]?.mrp > product?.price && (
                    <>
                      <span className="original-price"> ₹{product?.variations?.[0]?.mrp?.toFixed(2)}</span>
                      <span className="discount"> {(((product.variations[0].mrp - product.price) / product.variations[0].mrp) * 100).toFixed(2)}% off</span>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Delivery Time */}
            <p className="delivery-time">⚡ Today in 30 mins</p>

            {/* Add to Cart */}
            <button className="add-to-cart-btn" aria-label="Add to Cart">+</button>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button className="scroll-btn right" onClick={scrollRight} aria-label="Scroll Right">
        &gt;
      </button>
    </div>
  );
};

export default ProductDisplay;
