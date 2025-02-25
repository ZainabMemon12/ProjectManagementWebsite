import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchEmployees from "../hooks/FetchEmployees";
import { Spin } from "antd";
const SixEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getEmployees = async () => {
      try {
        setLoading(true);
        const data = await FetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      }
       finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  if (loading) {
    return (
      <div className="cards">
        <Spin className="loader" />
      </div>
    );
  }

  return (
    <>
    <div className="flex-row">
    <div className="six-employees-empt-con"></div>
    <h1 className="six-employees-heading">Our Workers</h1>
    
    </div>
    
      <div className="cards">
        {employees.slice(0, 6).map((employee) => (
          <div key={employee._id} className="card2 hover-card2">
            <div className="book-mark"></div>
            <div className="icon-txt-card2 flex-row">
              <div className="card2-icon-con">
                <i className="ri-user-fill"></i>
              </div>
              <div className="card2-heading-con">
                <h3>{employee.name}</h3>
                <p>{employee.skills}</p>
              </div>
            </div>
            <span className="flex-row">
              <i className="ri-time-line"></i>
              <p>
                {employee.createdAt
                  ? new Date(employee.createdAt).toISOString().split("T")[0]
                  : "N/A"}
              </p>
            </span>
            <span className="flex-row">
              <i className="ri-mail-line"></i>
              <p>{employee.email}</p>
            </span>
            <span className="flex-row">
              <i className="ri-terminal-box-line"></i>
              {employee.projects && employee.projects.length > 0 ? (
                <p>{employee.projects[0].title}</p> 
              ) : (
                <p>No Projects</p>
              )}
            </span>
          </div>
        ))}
        <button className="card2-btn" onClick={() => navigate("/all-employees")}>
          See All Employees
        </button>
      </div>
    </>
  );
};

export default SixEmployees;
