import React from "react";
import DashboardLayout from "./DashboardLayout";
import { getUserFromToken } from "../services/authService";
import { FaTachometerAlt, FaUserCircle,FaChartLine } from "react-icons/fa";

export default function Dashboard() {
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
        <FaUserCircle /> View Profile
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
      roleType="user"
      sidebarContent={sidebarButtons}
    >
      <h2>Welcome to the User Dashboard</h2>
    </DashboardLayout>
  );
}
