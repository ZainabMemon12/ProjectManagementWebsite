import React from "react";
import AdminNavbar from "../components/AdminNavbar.jsx";
import AdminLeftNav from "../components/AdminLeftNav.jsx";
import SixEmployees from "../components/SixEmployees.jsx";
import ThingsLength from "../components/ThingsLength.jsx";
import SixProjects from "../components/SixProjects.jsx";

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="admin-main">
          <AdminLeftNav />

          <div className="admin-main-right admin-dashboard-right-con">
            <ThingsLength />
            <SixProjects />

            <SixEmployees />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
