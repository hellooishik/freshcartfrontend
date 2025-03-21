import React from 'react';

const CitiesWeServe = () => {
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Cities We Serve</h2>
      <ul className="text-center">
        {cities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesWeServe;