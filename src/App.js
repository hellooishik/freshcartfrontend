import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoggedInHomePage from "./pages/LoggedInHomePage";
import Productapt from "./Components/productapt";
import CategoryPage from "./pages/CategoryPage";

// The main function componnet will be redirected from here 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/user", {
          withCredentials: true,
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
 
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <LoggedInHomePage user={user} /> : <Home />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Productapt />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Enhanced 404 Page */}
        <Route
          path="*"
          element={
            <div>
              <h2>404 - Page Not Found</h2>
              <p>Oops! The page you're looking for doesn't exist.</p>
              <a href="/">Go back to Home</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
