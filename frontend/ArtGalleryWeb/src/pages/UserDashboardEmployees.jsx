import React from 'react';
import UserLeftNav from "../components/UserLeftNav.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import UserNavbar from '../components/UserNavbar.jsx';
import UserDashboardAllEmployees from '../components/UserDashboardAllEmployees.jsx';

const UserDashboardEmployees = () => {
     const { userData, logout } = useAuth();
  return (
    <>
    <div className="user-dashboard-con flex-row">
    <UserLeftNav />
    <div className="user-dashboard-main">
    <UserNavbar/>
          <div className="profile-heading flex-row">
            <div className="profile-empt-con"></div>
            <h3>Employees List</h3>
          </div>
          <div className="user-dashboard-employees-con">
            <UserDashboardAllEmployees/>
          </div>
    </div>
    </div>
    </>
  )
}

export default UserDashboardEmployees