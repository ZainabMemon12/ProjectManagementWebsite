import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../hooks/FetchEditEmployee";
import AdminNavbar from "../components/AdminNavbar";
import AdminLeftNav from "../components/AdminLeftNav";
import { Spin } from "antd";
import { Modal } from "antd";
import { message } from "antd";


const EditEmployee = () => {
  const getOrdinal = (number) => {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) return number + "st";
    if (j === 2 && k !== 12) return number + "nd";
    if (j === 3 && k !== 13) return number + "rd";
    return number + "th";
  };

  const { id } = useParams();
  console.log("Employee ID from Params:", id);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    role: "",
    skills: "",
    salary: "",
    createdAt: "",
    updatedAt: "",
    projects: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        setLoading(true);
        const data = await fetchEmployeeById(id);
        setEmployee(data);
        setUpdatedData({
          name: data.name,
          email: data.email,
          role: data.role,
          salary: data.salary,
          skills: data.skills,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEmployee();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await updateEmployee(id, updatedData);
      const updatedEmployee = await fetchEmployeeById(id);
      setEmployee(updatedEmployee);
      
      message.success("Employee details updated successfully!");
    } catch (err) {
      message.error("Failed to update employee: " + err.message);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Are you sure you want to delete this employee?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteEmployee(id);
          alert("Employee deleted successfully!");
          navigate("/all-employees");
        } catch (err) {
          message.error("Failed to delete employee: " + err.message);
        }
      },
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-main">
        <AdminLeftNav />
        <div className="admin-main-right edit-employee-admin-main-right" style={{ minHeight: "500px" }}>
          {!employee || loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="employee-card-details flex-row">
                <div className="edit-form">
                  <h2>Edit Employee</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="edit-name-email-con">
                      <div className="flex-col">
                        <label>Name*</label>
                        <input
                          type="text"
                          name="name"
                          value={updatedData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-col">
                        <label>Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={updatedData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex-col">
                      <label>Role*</label>
                      <input
                        type="text"
                        name="role"
                        value={updatedData.role}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-col">
                      <label>Salary*</label>
                      <input
                        type="number"
                        name="salary"
                        value={updatedData.salary}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-col">
                      <label>Skills*</label>
                      <input
                        type="text"
                        name="skills"
                        value={updatedData.skills}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit">Update</button>
                  </form>
                  <button
                    className="delete-button"
                    onClick={handleDelete}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Delete Employee
                  </button>
                </div>
                <div className="edit-card">
                  <h2>Employee Details</h2>
                  <div className="edit-card-txt flex-row">
                    <div className="edit-card-icon flex-col">
                      <i className="fas fa-signature"></i>
                      <i className="fa-solid fa-envelope"></i>
                      <i className="fa-regular fa-address-book"></i>
                      <i className="fa-solid fa-money-bill"></i>
                      <i className="fa-solid fa-laptop"></i>
                      <i className="fa-solid fa-user-plus"></i>
                      <i className="fa-solid fa-user-pen"></i>
                    </div>
                    <div className="edit-card-text">
                      <p>
                        <strong>Name:</strong> {employee.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {employee.email}
                      </p>
                      <p>
                        <strong>Role:</strong> {employee.role}
                      </p>
                      <p>
                        <strong>Salary:</strong>
                        {employee.salary
                          ? new Intl.NumberFormat("en-PK", {
                              maximumFractionDigits: 0,
                            }).format(Number(employee.salary)) + " PKR"
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Skills:</strong> {employee.skills}
                      </p>
                      <p>
                        <strong>Created At:</strong>
                        {employee.createdAt
                          ? new Date(employee.createdAt)
                              .toISOString()
                              .split("T")[0]
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Updated At:</strong>
                        {employee.updatedAt
                          ? new Date(employee.updatedAt)
                              .toISOString()
                              .split("T")[0]
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <h5 className="project-heading">Under Execution:</h5>
                {employee.projects && employee.projects.length > 0 ? (
                  employee.projects.map((project, index) => (
                    <div key={project._id || index}>
                      {index > 0 && (
                        <h5
                          style={{
                            margin: "10px 0",
                            color: "rgba(255, 255, 255, 0.728)",
                            borderTop: "1px solid rgba(255, 255, 255, 0.228)",
                            paddingTop: "20px",
                            marginTop: "20px",
                          }}
                        >
                          {getOrdinal(index + 1)} Project:
                        </h5>
                      )}
                      <div className="project-details">
                        <div className="project-details-h2-p">
                          <p
                            className="project-status"
                            style={{
                              backgroundColor:
                                project.status === "Pending"
                                  ? "#800040"
                                  : project.status === "In Progress"
                                  ? "#004488"
                                  : project.status === "Completed"
                                  ? "rgba(37, 115, 241, 0.59)"
                                  : "#006400",
                              color:
                                project.status === "Pending"
                                  ? "#FFB6C1"
                                  : project.status === "In Progress"
                                  ? "#66CCFF"
                                  : project.status === "Completed"
                                  ? "#66FF99"
                                  : "transparent",
                              padding: "5px 5px",
                              borderRadius: "5px",
                              width: "fit-content",
                              textAlign: "center",
                              fontSize: "10px",
                              position: "absolute",
                              right: "10px",
                            }}
                          >
                            {project.status}
                          </p>
                          <h2>{project.title}</h2>
                        </div>

                        <p>{project.description}</p>

                        <p
                          style={{
                            backgroundColor:
                              project.priority === "high"
                                ? "#7D0000"
                                : project.priority === "medium"
                                ? "#8B4500"
                                : project.priority === "low"
                                ? "#1E5631"
                                : "transparent",
                            color:
                              project.priority === "high"
                                ? "#FF9999 "
                                : project.priority === "medium"
                                ? "#FFCC99"
                                : project.priority === "low"
                                ? "#A3E4A5"
                                : "transparent",
                            padding: "5px 5px",
                            borderRadius: "5px",
                            width: "fit-content",
                            textAlign: "center",
                            fontSize: "10px",
                          }}
                        >
                          {project.priority}
                        </p>

                        <div className="project-pb-con">
                          <p>{project.progress}%</p>

                          <div className="progress-bar">
                            {(() => {
                              const filledCount = Math.floor(
                                project.progress / 10
                              );
                              let filledColor, emptyColor;
                              if (project.progress <= 20) {
                                filledColor = "#FF4D4D";
                                emptyColor = "#7D0000";
                              } else if (project.progress <= 60) {
                                filledColor = "#FF8C42";
                                emptyColor = "#8B4500";
                              } else {
                                filledColor = "#A259FF";
                                emptyColor = "#4B0082";
                              }
                              return Array.from({ length: 10 }).map(
                                (_, index) => (
                                  <span
                                    key={index}
                                    className="dot"
                                    style={{
                                      backgroundColor:
                                        index < filledCount
                                          ? filledColor
                                          : emptyColor,

                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                      marginRight: "1px",
                                    }}
                                  ></span>
                                )
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No projects have been assigned to {employee.name} yet</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
