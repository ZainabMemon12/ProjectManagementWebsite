import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchEmployees from "../hooks/FetchEmployees";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const GetAllEmployees = ({ searchQuery }) => {
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
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {error ? (
        alert("error fetching data")
      ) : (
        <div className="All-cards">
          <div className="card">
            <p>Employee Name</p>
            <p className="email"> Email</p>
            <p className="skills">Skills</p>
            <p className="projects">Projects</p>
            <p>Edit</p>
          </div>
          {filteredEmployees.map((employee) => (
            <div key={employee._id} className="card2 employee-list">
              <div className="book-mark bookmark-responsive"></div>
              <h3>{employee.name}</h3>
              <p>{employee.email}</p>
              <p className="skill">{employee.skills}</p>
              {employee.projects && employee.projects.length > 0 ? (
                <p className="projects">{employee.projects[0].title}</p>
              ) : (
                <p className="projects">No Projects</p>
              )}

              <button
                onClick={() => navigate(`/edit-employee/${employee._id}`)}
              >
                <i className="fa-regular fa-pen-to-square"></i>{" "}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GetAllEmployees;
