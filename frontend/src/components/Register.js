// src/components/Register.js
import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { FaUser, FaEnvelope, FaLock, FaCheck, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FaCircleExclamation, FaCircleCheck } from 'react-icons/fa6';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Error during registration");
    }
  };

  return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
       style={{ background: "linear-gradient(135deg, #f0f8ff 0%, #e6e9ff 100%)" }}>
    <div className="card shadow-lg" style={{ width: "100%", maxWidth: "450px" }}>
      <div className="card-header bg-primary text-white text-center py-3" 
           style={{ background: "linear-gradient(to right, #6610f2, #6f42c1)" }}>
        <div className="mb-2">
          <FaUserPlus size={32} />
        </div>
        <h2 className="m-0">Create Account</h2>
        <p className="m-0 text-white-50">Join our community</p>
      </div>
      
      <div className="card-body p-4">
        {message && (
          <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} mb-4 d-flex align-items-center`}>
            {message.type === 'error' ? 
              <FaCircleExclamation className="me-2" /> : 
              <FaCircleCheck className="me-2" />}
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label d-flex align-items-center">
              <FaUser className="me-2" /> Username
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label d-flex align-items-center">
              <FaEnvelope className="me-2" /> Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label d-flex align-items-center">
              <FaLock className="me-2" /> Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
            />
            <label className="form-check-label d-flex align-items-center" htmlFor="terms">
              <FaCheck className="me-2 text-success" /> I agree to the <a href="#" className="text-decoration-none ms-1">Terms and Conditions</a>
            </label>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mb-3 d-flex align-items-center justify-content-center"
            style={{ background: "linear-gradient(to right, #6610f2, #6f42c1)", border: "none" }}
          >
            <FaUserPlus className="me-2" /> Register
          </button>
        </form>
        
        <div className="text-center mt-3">
          <p className="text-muted d-flex align-items-center justify-content-center">
            <FaSignInAlt className="me-2" /> Already have an account?{' '}
            <a href="/login" className="text-decoration-none ms-1">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
