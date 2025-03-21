import React from 'react';

const PopularSearches = () => {
  const searches = ['Fresh Chicken', 'Organic Eggs', 'Wild Salmon', 'Local Vegetables'];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Popular Searches</h2>
      <ul className="text-center">
        {searches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularSearches;