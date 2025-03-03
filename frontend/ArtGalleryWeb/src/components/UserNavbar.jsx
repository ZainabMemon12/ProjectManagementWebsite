import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "antd";

const UserNavbar = () => {
  const { userData, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="user-dashboard-heading-search flex-row">
      <h2>
        <strong>Welcome,</strong> {userData.name}!
      </h2>
      <Button className="user-nav-btn" onClick={handleLogout}>
        <i className="ri-logout-circle-line"></i>
      </Button>
      <div className="user-search-bar flex-row">
        <i className="ri-search-2-line"></i>
        <input type="search" placeholder="Search for projects" />
      </div>
    </div>
  );
};

export default UserNavbar;
