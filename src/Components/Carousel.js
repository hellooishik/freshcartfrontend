import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../context/config';
import '../css/Carousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ categoryId }) => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(4);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setVisibleItems(2);
    } else if (window.innerWidth <= 1024) {
      setVisibleItems(3);
    } else {
      setVisibleItems(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300 * visibleItems, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300 * visibleItems, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn left" onClick={scrollLeft}><FaChevronLeft /></button>
      <div className="carousel-scroll" ref={scrollRef}>
        {categories.map((category) => (
          <div className="carousel-item" key={category._id}>
             <img
                             src={`${API_URL}${category.image}`}
                             alt={category.name}
                             className="category-img"
                             onError={(e) => e.target.src = '/placeholder.png'}
                           />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <button className="carousel-btn right" onClick={scrollRight}><FaChevronRight /></button>
    </div>
  );
};

export default Carousel;
