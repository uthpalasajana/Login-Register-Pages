import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
export default function Home() {
 return (
    <div className="container text-center mt-5">
      <div
        className="card shadow-lg p-5 mx-auto border-0"
        style={{
          maxWidth: "600px",
          background: "linear-gradient(135deg, #007bff 0%, #6f42c1 100%)",
          color: "#fff",
          borderRadius: "15px",
        }}
      >
        <h1 className="mb-3 fw-bold" style={{ fontSize: "2.2rem" }}>
          Welcome to Our App
        </h1>
        <p className="fs-5" style={{ opacity: 0.9 }}>
          Please login or register to continue.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link
            to="/login"
            className="btn btn-light btn-lg px-4 d-flex align-items-center gap-2 fw-semibold shadow-sm"
            style={{ borderRadius: "8px" }}
          >
            <FaSignInAlt size={20} /> Login
          </Link>

          <Link
            to="/register"
            className="btn btn-warning btn-lg px-4 d-flex align-items-center gap-2 fw-semibold shadow-sm"
            style={{ borderRadius: "8px" }}
          >
            <FaUserPlus size={20} /> Register
          </Link>
        </div>
      </div>
    </div>
  );
};
