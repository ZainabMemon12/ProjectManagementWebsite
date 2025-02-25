import React from "react";
import "./App.css";
import "./responsive.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import MainPage from "./pages/MainPage";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
import { useAuth } from "./contexts/AuthContext";
import AllEmployees from "./pages/AllEmployees.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import CreateProjects from "./pages/CreateProjects.jsx";
import EditProject from "./pages/EditProject.jsx";
import UserDashboardManageProfile from "./pages/UserDashboardManageProfile.jsx";
import UserDashboardProfile from "./pages/UserDashboardProfile.jsx";
import UserDashboardEmployees from "./pages/UserDashboardEmployees.jsx";
import UserDashboardProjects from "./pages/UserDashboardProjects.jsx";
import UserDashboardAllProjectsPage from "./pages/UserDashboardAllProjectsPage.jsx";
import EditUserProject from "./pages/EditUserProject.jsx";

const App = () => {
  const { isAuthenticated, userData } = useAuth();

  return (
    <Router>
      <Routes>
        
       
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              userData.role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/user-dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
{/* admin routes */}
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/create-employee"
          element={
            isAuthenticated && userData.role === "admin" ? <CreateEmployee /> : <Navigate to="/" />
          }
        />
        <Route
          path="/all-employees"
          element={
            isAuthenticated && userData.role === "admin" ? <AllEmployees /> : <Navigate to="/" />
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            isAuthenticated && userData.role === "admin" ? <EditEmployee /> : <Navigate to="/" />
          }
        />
        <Route
          path="/create-projects"
          element={
            isAuthenticated && userData.role === "admin" ? <CreateProjects /> : <Navigate to="/" />
          }
        />
        <Route
          path="/All-projects"
          element={isAuthenticated && userData.role === "admin" ? <AllProjects /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-project/:id"
          element={isAuthenticated && userData.role === "admin" ? <EditProject /> : <Navigate to="/" />}
        />

        <Route
          path="/user-dashboard"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <UserDashboardProfile />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/edit-profile"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <UserDashboardManageProfile />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/userdashboard-employees"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <UserDashboardEmployees />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/userdashboard-projects"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <UserDashboardProjects />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/userdashboard-Allprojects"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <UserDashboardAllProjectsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/edit-user-project/:id"
          element={
            isAuthenticated && userData.role === "employee" ? (
              <EditUserProject />
            ) : (
              <Navigate to="/" />
            )
          }
        />
       
      </Routes>
    </Router>
  );
};

export default App;
