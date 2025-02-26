import React from "react";
import { NavLink } from "react-router-dom";

const AdminLeftNav = () => {
  return (
    <div className="admin-main-left">
      <div className="left-link">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => (isActive ? "link active" : "link")}
          data-title="Dashboard"
        >
          <i className="fa-solid fa-table-columns"></i>
          <span> Dashboard</span>
        </NavLink>
      </div>
      <div className="left-link">
        <NavLink
          to="/create-employee"
          className={({ isActive }) => (isActive ? "link active" : "link")}
          data-title="Add Employee"
        >
          <i className="fa-solid fa-user-plus"></i>
          <span> Add Employee</span>
        </NavLink>
      </div>
      <div className="left-link">
        <NavLink
          to="/All-employees"
          className={({ isActive }) => (isActive ? "link active" : "link")}
          data-title="All Employees"
        >
          <i className="fa-solid fa-users"></i>
          <span> All Employees</span>
        </NavLink>
      </div>
      <div className="left-link">
        <NavLink
          to="/create-projects"
          className={({ isActive }) => (isActive ? "link active" : "link")}
          data-title="Create Projects"
        >
          <i className="fa-solid fa-diagram-project"></i>
          <span> Create Projects</span>
        </NavLink>
      </div>
      <div className="left-link">
        <NavLink
          to="/All-projects"
          className={({ isActive }) => (isActive ? "link active" : "link")}
          data-title="All Projects"
        >
          <i className="ri-clapperboard-ai-fill"></i>
          <span> All Projects</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminLeftNav;
