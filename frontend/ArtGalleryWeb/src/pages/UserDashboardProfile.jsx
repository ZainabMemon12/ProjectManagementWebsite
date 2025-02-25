import React from 'react'
import { Link } from 'react-router-dom'
import UserLeftNav from "../components/UserLeftNav";
import { useAuth } from "../contexts/AuthContext.jsx";
import UserNavbar from '../components/UserNavbar.jsx';
import myimg from "../imgFolder/myimg.jpg"

const UserDashboardProfile = () => {
    const { userData, logout } = useAuth();
  return (
   <>
    

            <div className="user-dashboard-con flex-row">
            <UserLeftNav />
            <div className="user-dashboard-main">
            <UserNavbar/>
          <div className="profile-heading flex-row">
            <div className="profile-empt-con"></div>
            <h3>Profile</h3>
          </div>
          <div className="user-profile-con">
                <div className="user-profile-image">
                    <img src={myimg}/>
                </div>
                <div className="user-Profile-detail">
                    <div className="user-p-d">
                    <h4>Name:</h4>
                    <p>{userData.name}</p>
                    </div>
                    <div className="user-p-d">
                    <h4>Email:</h4>
                    <p>{userData.email}</p>
                    </div>
                    <div className="user-p-d">
                    <h4>salary:</h4>
                    <p>{userData.salary
                    ? new Intl.NumberFormat("en-PK", {
                        maximumFractionDigits: 0,
                      }).format(Number(userData.salary)) + "PKR"
                    : "N/A"}</p>
                    </div>
                    <div className="user-p-d">
                    <h4>Role:</h4>
                    <p>{userData.role}</p>
                    </div>
                    <div className="user-p-d">
                    <h4>skill:</h4>
                    <p>{userData.skills}</p>
                    </div>
                    <div className="profile-btn">
            <i className="ri-user-settings-line"></i>
              <Link to={`/edit-profile`} className="profile-link">
                Edit Profile
              </Link>
            </div>
                </div>
            </div>
            </div>
            </div>
   </>
  )
}

export default UserDashboardProfile