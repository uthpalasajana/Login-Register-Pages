// src/components/Login.js
import React, { useState } from "react";
import { login, getUserFromToken } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUser,
  faLock,
  faSignInAlt,
  faUserPlus,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login({ username, password });

      if (token) {
        const user = getUserFromToken();
        if (!user) {
          setError("Failed to decode user info.");
          return;
        }

        // Navigate based on role
        if (user.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ background: "linear-gradient(135deg, #f0f8ff 0%, #e6e9ff 100%)" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="card shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className="bg-primary text-white text-center p-4"
            style={{ background: "linear-gradient(to right, #6610f2, #6f42c1)" }}
          >
            <div className="mb-2">
              <FontAwesomeIcon icon={faUserCircle} size="3x" />
            </div>
            <h2 className="m-0">Welcome Back</h2>
            <p className="m-0 text-white-50">Sign in to your account</p>
          </div>

          {/* Body */}
          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger mb-4">
                <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  <FontAwesomeIcon icon={faUser} className="me-2" /> Username
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  <FontAwesomeIcon icon={faLock} className="me-2" /> Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-3 mb-3 d-flex align-items-center justify-content-center"
                style={{
                  background: "linear-gradient(to right, #6610f2, #6f42c1)",
                  border: "none",
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                Sign In
              </button>
            </form>

            {/* Signup link */}
            <div className="text-center mt-3">
              <p className="text-muted">
                <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                Don't have an account?{" "}
                <a href="/register" className="text-decoration-none">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
