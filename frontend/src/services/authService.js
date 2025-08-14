import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8085/";

// Register user
export const register = async (userData) => {
  return await axios.post(API_URL + "register", userData);
};

// Login user
export const login = async (credentials) => {
  const response = await axios.post(API_URL + "login", credentials);

  if (response.data) {
    localStorage.setItem("token", response.data); // Store token
  }

  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Decode JWT and get username + role
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      username: decoded.sub, // JWT subject
      role: decoded.role,    // custom claim
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
