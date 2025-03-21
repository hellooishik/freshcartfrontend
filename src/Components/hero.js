import React from 'react';

export default function Hero() {
  return (
    <div
      className="hero-section text-center py-5 d-flex flex-column justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: 'url(https://assets.licious.in/oms/3231305f-e568-d8a0-843b-bdce5731230a/original/1736941339149.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
      }}
    >
    {/* The main module is been set to the main draft   */}
      {/* Black Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} // Adjust opacity as needed
      ></div>

      {/* Content */}
      <div className="position-relative text-white text-center">
        <h1 className="display-3 fw-bold">Fresh Corner</h1>
        <p className="lead">Your favourite Fresh shop is now online</p>
        <button className="btn btn-light btn-lg fw-semibold shadow-lg px-5 py-2">
          Shop Now
        </button>
      </div>
    </div>
  );
}
