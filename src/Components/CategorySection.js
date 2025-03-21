import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/CategorySection.css"
import {API_URL} from "../context/config"
const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container-fluid py-5">
      <h2 className="bestseller-title">Shop by categories</h2>

      {categories.length > 0 ? (
        <div className="row g-4 justify-content-center">
          {categories.map((category) => (
            <div className="col-6 col-md-3 col-lg-2 text-center" key={category._id}>
              <div className="category-card">
                              <img
                  src={`http://localhost:4000${category.image}`}
                  alt={category.name}
                  className="category-img"
                  onError={(e) => e.target.src = '/placeholder.png'}
                />
                <p className="category-name">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No categories available.</p>
      )}
    </div>
  );
};

export default CategorySection;
