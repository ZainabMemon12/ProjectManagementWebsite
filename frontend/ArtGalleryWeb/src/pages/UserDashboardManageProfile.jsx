import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLeftNav from "../components/UserLeftNav";
import UserNavbar from "../components/UserNavbar.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  fetchEmployeeById,
  updateEmployee,
} from "../hooks/FetchEditEmployee.js";
import myimg from "../imgFolder/myimg.jpg"
import { Link } from "react-router-dom";

const UserDashboardManageProfile = () => {
  const { userData, updateUserData, } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
  });
  const navigate = useNavigate();

  
  useEffect(() => {
    const getEmployee = async () => {
      try {
        const employee = await fetchEmployeeById(userData.id);
        setFormData({
          name: employee.name,
          email: employee.email,
          skills: employee.skills || "",
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    getEmployee();
  }, [userData.id]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(userData.id, formData);
      updateUserData({
        ...userData,
        ...formData,
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      skills: userData.skills,
    });
    navigate("/profile"); 
  };

  return (
    <>
      <div className="user-dashboard-con flex-row">
        <UserLeftNav />
        <div className="user-dashboard-main">
        <UserNavbar/>
         
          <div className="profile-heading flex-row">
            <div className="profile-empt-con"></div>
            <h3>Edit Profile</h3>
          </div>
          <div className="user-profile-con">
                <div className="user-profile-image">
                    <img src={myimg}/>
                </div>
                <div className="user-Profile-detail ">
                <form onSubmit={handleSubmit} className="flex-col">
                  <div className="profile-edit">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              </div>
<div className="profile-edit">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              </div>

<div className="profile-edit">
              <label>Skills:</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
              </div>
              <div className="profile-edit-btn-con">

              <button type="submit">Save</button>
              <button className="edit-btn2" type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
                    
                    
                    
                    
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardManageProfile;
