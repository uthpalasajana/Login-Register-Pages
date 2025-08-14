import React from "react";
import { FaUserCircle, FaUserShield, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ username, role, roleType, children, sidebarContent }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!username || !role) {
    navigate("/login");
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Sidebar Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          {roleType === "admin"
            ? <FaUserShield size={50} style={{ color: "#fff" }} />
            : <FaUserCircle size={50} style={{ color: "#fff" }} />}
          <h2 style={{ marginTop: "10px", fontSize: "1.3rem", fontWeight: "600" }}>
            {roleType === "admin" ? "Admin" : "User"} Panel
          </h2>
        </div>

        {/* Navigation Links */}
        {/* <nav style={{ flexGrow: 0, marginBottom: "30px" }}>
          <a href="/dashboard" style={linkStyle}><FaTachometerAlt /> Dashboard</a>
          {roleType === "admin" && (
            <a href="/admin-tools" style={linkStyle}><FaUserShield /> Admin Tools</a>
          )}
        </nav> */}
        {/* Sidebar Custom Content */}
        
        <div style={{ marginBottom: "auto" }}>
          {sidebarContent}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={logoutBtnStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = "#b91c1c"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#dc2626"}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <h1 style={headerStyle}>
          {roleType === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        {/* Info Card */}
        <div style={infoCardStyle}>
          <p style={infoText}><FaUserCircle style={{ color: "#2563eb" }} /> <strong>Username:</strong> {username}</p>
          <p style={infoText}><FaUserShield style={{ color: "#2563eb" }} /> <strong>Role:</strong> {role}</p>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}

/* ===== Styles ===== */
const sidebarStyle = {
  width: "250px",
  background: "linear-gradient(180deg, #1e3a8a, #2563eb)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
};

const mainContentStyle = {
  flex: 1,
  padding: "40px",
  background: "linear-gradient(135deg, #f0f8ff 0%, #e6e9ff 100%)"
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  borderRadius: "6px",
  marginBottom: "10px",
  transition: "background-color 0.3s ease",
  cursor: "pointer"
};

const logoutBtnStyle = {
  padding: "12px",
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  justifyContent: "center",
  marginTop: "auto"
};

const headerStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#1e3a8a",
  marginBottom: "30px",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const infoCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
  marginBottom: "30px"
};

const infoText = {
  fontSize: "1.1rem",
  color: "#34495e",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px"
};
