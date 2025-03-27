import { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Phone input, Step 2: OTP input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/auth/send-otp", { phoneNumber });
      setStep(2); // Proceed to OTP Verification
    } catch (error) {
      setError(error.response?.data?.msg || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", { phoneNumber, otp });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store Token
        setUser(response.data.user); // Set User
        alert("Login successful!");
      }
    } catch (error) {
      setError(error.response?.data?.msg || "OTP Verification Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>{step === 1 ? "Login with OTP" : "Enter Your OTP"}</h2>
      {error && <p className="error">{error}</p>}

      {step === 1 ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
        </form>
      )}

      {step === 2 && (
        <button onClick={() => setStep(1)}>Back to Phone Number</button>
      )}
    </div>
  );
}
