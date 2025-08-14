import React from "react";
import DashboardLayout from "./DashboardLayout";
import { getUserFromToken } from "../services/authService";
import { FaUsers, FaChartLine, FaTachometerAlt, FaUserShield } from "react-icons/fa";

export default function AdminDashboard() {
  const user = getUserFromToken();
  if (!user) return null;


  const sidebarItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  borderRadius: "6px",
  marginBottom: "10px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  backgroundColor: "transparent", // No different button colors
  border: "none",
  fontSize: "1rem"
};

  const sidebarButtons = (
    <div className="d-flex flex-column gap-2">
      <button style={sidebarItemStyle}>
        <FaTachometerAlt /> Dashboard
      </button>
      <button style={sidebarItemStyle}>
        <FaUserShield /> Admin Tools
      </button>
      <button style={sidebarItemStyle}>
        <FaUsers /> Manage Users
      </button>
      <button style={sidebarItemStyle}>
        <FaChartLine /> View Reports
      </button>
    </div>
  );

  return (
    <DashboardLayout
      username={user.username}
      role={user.role}
      roleType="admin"
      sidebarContent={sidebarButtons}
    >
      <h2>Welcome to the Admin Dashboard</h2>
    </DashboardLayout>
  );
}
