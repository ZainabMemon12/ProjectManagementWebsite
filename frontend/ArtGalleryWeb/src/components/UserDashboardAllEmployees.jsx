import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchEmployees from "../hooks/FetchEmployees";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const UserDashboardAllEmployees = () => {
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
      } finally {
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
      {error ? (
        alert("error fetching data")
      ) : (
        <div className="user-dashboard-employees">
          <div className="card user-dashboard-employees-card ">
            <p>Employee Name</p>
            <p className="email"> Email</p>
            <p className="skills user-Dashboard-project-res">Skills</p>
            <p className="pro-res">Projects</p>
            <p>Created At</p>
          </div>
          <div className="user-dashboard-em-con">
          {employees.map((employee) => (
            <div key={employee._id} className="user-dashboard-employees-All-cards">
            
              <h3>{employee.name}</h3>
              <p>{employee.email}</p>
              <p className="user-Dashboard-project-res">{employee.skills}</p>
              {employee.projects && employee.projects.length > 0 ? (
                <p className="pro-res">{employee.projects[0].title}</p>
              ) : (
                <p className="pro-res">No Projects</p>
              )}
              <p>
                        
                        {employee.createdAt
                          ? new Date(employee.createdAt)
                              .toISOString()
                              .split("T")[0]
                          : "N/A"}
                      </p>

            </div>
          ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboardAllEmployees;
