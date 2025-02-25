import React from 'react'
import UserLeftNav from "../components/UserLeftNav";
import { useAuth } from "../contexts/AuthContext.jsx";
import UserDashboardAllProjects from "../components/UserDashboardAllProjects.jsx";
import UserNavbar from '../components/UserNavbar.jsx';

const UserDashboardAllProjectsPage = () => {
  const { userData, logout } = useAuth();
  return (
   <>
    <div className="user-dashboard-con flex-row">
    <UserLeftNav />
    <div className="user-dashboard-main">
    <UserNavbar/>
          <div className="profile-heading flex-row">
            <div className="profile-empt-con"></div>
            <h3>Projects List</h3>
          </div>
          
            <UserDashboardAllProjects/>
         
      </div>
    </div>
   </>
  )
}

export default UserDashboardAllProjectsPage