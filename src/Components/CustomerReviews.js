import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CustomerReviews.css'


const reviews = [
  { quote: "Meatigo chicken is my son’s favourite - it’s juicy and clean.", name: "Dipanjana Nandi", location: "Bengaluru" },
  { quote: "Meatigo makes cooking easy with pre-cut & cleaned meats!", name: "Shalini Bardhan", location: "Kolkata" },
  { quote: "Absolutely love Meatigo Prawns! They are soft, juicy & cleaned.", name: "Rukma Dakshy", location: "Kolkata" },
  { quote: "I’ve never had Chicken that’s better than Meatigo!", name: "Biltu Mazumder", location: "Kolkata" },
  { quote: "I love how juicy Meatigo's Chicken Breast Boneless is.", name: "Alfateh Mustafa", location: "Bengaluru" }
];

const CustomerReviews = () => {
  return (
    <div className="review-section">
      <h2>What our customers say</h2>
      <p className="subtext">Hear it directly from people like you</p>

      <div className="review-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <p className="quote">“{review.quote}”</p>
            <div className="profile">
              <p className="name">{review.name}</p>
              <p className="location">{review.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
