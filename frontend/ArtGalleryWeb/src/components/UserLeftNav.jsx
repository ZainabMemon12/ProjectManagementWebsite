import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const UserLeftNav = () => {
  const { userData, logout } = useAuth();
  if (!userData) {
    return <div>Loading user data...</div>;
  }
  
  return (
    <div className="user-left-nav">
      <div className="user-top-left-nav">
        <div className="user-left-nav-txt">
          <div className="user-dashboard-icon-con">
            <i className="ri-shield-user-fill"></i>
          </div>
          <h2>{userData.name}</h2>
          <p>{userData.skills}</p>
        </div>
        <div className="user-bottom-left-nav">
          <div className="userdashboard-links">
            <div className="user-left-link">
              <NavLink 
                to="/user-dashboard" 
                className={({ isActive }) => isActive ? "user-link active" : "user-link"}
                data-title="Dashboard"
              >
                <i className="ri-dashboard-line"></i>
                <span> Dashboard</span>
              </NavLink>
            </div>
            <div className="user-left-link">
              <NavLink 
                to="/userdashboard-projects" 
                className={({ isActive }) => isActive ? "user-link active" : "user-link"}
                data-title="My Projects"
              >
                <i className="ri-file-user-fill"></i>
                <span>My Projects</span>
              </NavLink>
            </div>
            <div className="user-left-link">
              <NavLink 
                to="/userdashboard-Allprojects" 
                className={({ isActive }) => isActive ? "user-link active" : "user-link"}
                data-title="All Projects"
              >
                <i className="ri-file-copy-line"></i>
                <span>All Projects</span>
              </NavLink>
            </div>
            <div className="user-left-link">
              <NavLink 
                to="/userdashboard-employees" 
                className={({ isActive }) => isActive ? "user-link active" : "user-link"}
                data-title="Employees"
              >
                <i className="ri-user-community-fill"></i>
                <span>Employees</span>
              </NavLink>
            </div>
            <div className="user-left-link">
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? "user-link active" : "user-link"}
                data-title="Profile"
              >
                <i className="ri-user-settings-line"></i>
                <span>Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLeftNav;
