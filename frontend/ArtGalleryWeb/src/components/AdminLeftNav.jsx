import React from "react";
import { Link } from "react-router-dom";

const AdminLeftNav = () => {
  return (
    <>
      <div className="admin-main-left">
        <div className="left-link">
          <Link to="/admin-dashboard" className="link" data-title="Dashboard">
            <i className="fa-solid fa-table-columns"></i>
            <span> Dashboard</span>
          </Link>
        </div>
        <div className="left-link">
          <Link
            to="/create-employee"
            className="link"
            data-title="Add Employee"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span> Add Employee</span>
          </Link>
        </div>
        <div className="left-link">
          <Link to="/All-employees" className="link" data-title="All Employees">
            <i className="fa-solid fa-users"></i>
            <span>All Employees</span>
          </Link>
        </div>
        <div className="left-link">
          <Link
            to="/create-projects"
            className="link"
            data-title="create Projects"
          >
            <i className="fa-solid fa-diagram-project"></i>
            <span> create Projects</span>
          </Link>
        </div>
        <div className="left-link">
          <Link to="/All-projects" className="link" data-title="All Projects">
            <i className="ri-clapperboard-ai-fill"></i>
            <span> All Projects</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminLeftNav;
