const getBaseURL = () => {
    const isLocalhost = window.location.hostname === 'localhost';
    return isLocalhost
      ? 'http://localhost:4000'
      : 'https://buildfreshcart-3.onrender.com';
  };
  
  export const API_URL = getBaseURL();
  