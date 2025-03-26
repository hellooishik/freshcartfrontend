import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css'
import applogo from '../Assets/playstore-homepage.png'
import applelogo from '../Assets/app-store-homepage.png'
import logo from '../Assets/logo.png'
import visa from '../Assets/3-dsecure.png'


export default function Footer() {
  return (
    <footer className="py-5" style={{ backgroundColor: '#fff', color: '#000' }}>
      <div className="container">
        <div className="row">
          {/* Experience App Section */}
          <div className="col-md-4">
          <img src={logo} alt="App Store" style={{ width: '150px' }} />
            <h5 className="fw-bold mb-3">EXPERIENCE FRESHCART APP ON MOBILE</h5>
            <div className="d-flex gap-2 mb-4">
              <img src={applogo} alt="App Store" style={{ width: '150px' }} />
              <img src={applelogo} alt="Google Play" style={{ width: '150px' }} />
            </div>
            <h5 className="fw-bold mb-3">KEEP IN TOUCH</h5>
            <div className="d-flex gap-3">
              <FaTwitter size={30} />
              <FaFacebookF size={30} />
              <FaInstagram size={30} />
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">USEFUL LINKS</h5>
            <ul className="list-unstyled">
              {['Why Freshcart?', 'Refer & Earn', 'Freshcart Cash & Cash+', 'Careers', 'BLOG'].map((link, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="text-decoration-none text-secondary">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">CONTACT US</h5>
            <p className="mb-1">Call: 1800-4190-786</p>
            <p>Email: <a href="mailto:talktous@licious.com" className="text-decoration-none">talktous@Freshcart.com</a></p>
            <p><strong>REGISTERED OFFICE ADDRESS:</strong><br />
              Freshcart India PVT LTD<br />
              891 Jessore Road, 2nd Fl, Rupantar Building, Bangur Avenue, North 24 Parganas, Dum Dum Park, West Bengal, India, 700055
            </p>
            <div className="d-flex gap-2 mt-3">
              <img src={visa} alt="Verified by VISA" style={{ width: '200px' }} />
            </div>
            <p className="mt-3"><strong>HAVE SECURITY CONCERN?</strong><br />
              Mail us at: <a href="mailto:security@licious.com" className="text-decoration-none">security@Freshcart.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
