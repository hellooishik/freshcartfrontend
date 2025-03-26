import React from 'react';
import '../css/CitiesWeServe.css'

const CitiesWeServe = () => {
  const cities = [
    'Bengaluru', 'NCR', 'Hyderabad', 'Chandigarh', 'Panchkula', 
    'Mohali', 'Mumbai', 'Pune', 'Chennai', 'Coimbatore', 
    'Jaipur', 'Cochin', 'Vijayawada', 'Visakhapatnam', 
    'Kolkata', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">CITIES WE SERVE</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {cities.map((city, index) => (
          <div key={index} className="city-pill m-2 px-4 py-2">
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesWeServe;