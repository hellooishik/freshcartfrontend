import { useState } from "react";
import axios from "axios";
import Header from "../Components/header";
import Footer from "../Components/footer";
import CitiesWeServe from "../Components/CitiesWeServe";
import MeatInfoSection from "../Components/MeatInfoSection";
import { API_URL } from "../context/config";
import "../css/Login.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        alert("Login successful!");
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="login-page">
        <div className="login-wrapper">
          <div className="login-card">
            <h2>Login to Your Account</h2>
            <p className="subtext">Get access to the freshest meat in your city</p>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="footer-actions">
              <button className="link-button" onClick={() => alert("Coming soon!")}>
                Forgot Password?
              </button>
              <span>•</span>
              <button className="link-button" onClick={() => alert("Redirecting to Signup...")}>
                Create Account
              </button>
            </div>
          </div>
        </div>

        <div className="extras">
   
          <CitiesWeServe />
          <MeatInfoSection />
        </div>
      </div>

      <Footer />
    </>
  );
}
