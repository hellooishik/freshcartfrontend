import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
// update
export default function Footer() {
  return (
<footer className="py-5 pt-6" style={{ backgroundColor: 'white' }}>
      <div className="container-fluid">
        <div className="row text-center text-md-start">
          
          {/* Useful Links */}
          <div className="col-md-4" style={{textAlign : 'center'}}>
            <h4 className="fw-bold mb-3">Useful Links</h4>
            <ul className="list-unstyled">
              {['About', 'Careers', 'Blog', 'Press', 'Lead', 'Value'].map((item) => (
                <li key={item} className="text-secondary mb-2">{item}</li>
              ))}
            </ul>
          </div>
                
          {/* Categories */}
          <div className="col-md-4" style={{textAlign : 'center'}}>
            <h4 className="fw-bold mb-3">Categories</h4>
            <ul className="list-unstyled">
              {['Chicken', 'Meat', 'Fish', 'Eggs'].map((category) => (
                <li key={category} className="text-secondary mb-2">{category}</li>
              ))}
            </ul>
          </div>

          {/* App Download and Social Links */}
          <div className="col-md-4" >
            <h4 className="fw-bold mb-3">Download App</h4>
            <div className="mb-3">
              <button className="btn btn-dark me-2">App Store</button>
              <button className="btn btn-dark">Google Play</button>
            </div>

            <h4 className="fw-bold mb-3">Follow Us</h4>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <FaFacebookF className="text-secondary fs-5" />
              <FaTwitter className="text-secondary fs-5" />
              <FaInstagram className="text-secondary fs-5" />
              <FaLinkedinIn className="text-secondary fs-5" />
              <FaPinterestP className="text-secondary fs-5" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-secondary mt-4">
          <p>&copy; 2024 FreshCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
