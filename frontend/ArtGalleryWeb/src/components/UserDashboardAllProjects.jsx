import React, { useState, useEffect } from "react";
import FetchProjects from "../hooks/FetchProjects";
import { useNavigate } from "react-router-dom";

const UserDashboardAllProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await FetchProjects();
        const inProgress = data.filter(
          (project) => project.status === "In Progress"
        );
        const completed = data.filter(
          (project) => project.status === "Completed"
        );
        const pending = data.filter((project) => project.status === "Pending");

        setInProgressProjects(inProgress);
        setCompletedProjects(completed);
        setPendingProjects(pending);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);
  return (
    <>
      <div className="User-Dashboard-boxes-con">
        <div className="project-boxes">
          <div className="pro-box">
            <div className="pro-box-heading-user-dashboard">
              <p style={{ borderBottomColor: "rgba(231, 148, 14, 0.99)" }}>
                Pending <span>{pendingProjects.length}</span>
              </p>
            </div>
            <div className="All-projects-cards userdashboard-pro-box ">
              {pendingProjects.map((project) => (
                <div
                  className="project-all-card userdashboard-pro-boxss"
                  key={project._id}
                >
                  <div className="status-btn flex-row">
                    <p
                      style={{
                        backgroundColor:
                          project.status === "Pending"
                            ? "rgba(252, 169, 2, 0.97)"
                            : project.status === "In Progress"
                            ? "rgba(252, 2, 186, 0.97)"
                            : project.status === "Completed"
                            ? "rgba(37, 115, 241, 0.97)"
                            : "#006400",
                        color:
                          project.status === "Pending"
                            ? "rgba(255, 255, 255, 0.97)"
                            : project.status === "In Progress"
                            ? "rgba(247, 242, 245, 0.97)"
                            : project.status === "Completed"
                            ? "rgba(236, 236, 236, 0.97)"
                            : "transparent",
                        padding: "5px 7px",
                        borderRadius: "10px",
                        width: "fit-content",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                    >
                      {project.status}
                    </p>
                  </div>

                  <h3>{project.title}</h3>

                  <p>
                    {project.description.length > 92
                      ? project.description.substring(0, 92) + "..."
                      : project.description}
                  </p>
                  <div className="project-pb-con">
                    <p>{project.progress}%</p>

                    <div className="progress-bar">
                      {(() => {
                        const filledCount = Math.floor(project.progress / 10);
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
                        return Array.from({ length: 10 }).map((_, index) => (
                          <span
                            key={index}
                            className="dot"
                            style={{
                              backgroundColor:
                                index < filledCount ? filledColor : emptyColor,

                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                              marginRight: "1px",
                            }}
                          ></span>
                        ));
                      })()}
                    </div>
                  </div>
                  {project.assignedTo && project.assignedTo.length > 0 ? (
                    <span className="flex-row">
                      <p
                        className="project-dashboard-assignedTo"
                        style={{
                          color: "red",
                          backgroundColor: "rgba(235, 129, 172, 0.45)",
                        }}
                      >
                        {project.assignedTo.map((emp) => emp.name).join(", ")}
                      </p>
                      <p
                        className="project-dashboard-assignedTo2"
                        style={{
                          color: "rgb(67, 6, 105)",
                          backgroundColor: "rgba(140, 27, 210, 0.36)",
                        }}
                      >
                        {project.assignedTo.map((emp) => emp.email).join(", ")}
                      </p>
                    </span>
                  ) : (
                    <p>Not assigned</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="pro-box">
            <div className="pro-box-heading">
              <p style={{ borderBottomColor: " #C0392B" }}>
                High-Priority <span>{highPriorityProjects.length}</span>
              </p>
            </div>
            <div className="All-projects-cards">
              {highPriorityProjects.map((project) => (
                <div className="project-all-card" key={project._id}>
                  <div className="status-btn flex-row">
                    <p
                      style={{
                        backgroundColor:
                          project.status === "Pending"
                            ? "rgba(231, 148, 14, 0.99)"
                            : project.status === "In Progress"
                            ? "#004488"
                            : project.status === "Completed"
                            ? "rgba(37, 115, 241, 0.59)"
                            : "#006400",
                        color:
                          project.status === "Pending"
                            ? "rgba(45, 29, 3, 0.99)"
                            : project.status === "In Progress"
                            ? "#66CCFF"
                            : project.status === "Completed"
                            ? "#66FF99"
                            : "transparent",
                        padding: "3px 5px",
                        borderRadius: "10px",
                        width: "fit-content",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                    >
                      {project.status}
                    </p>
                    <button
                      onClick={() => navigate(`/edit-project/${project._id}`)}
                    >
                      <i className="fa-regular fa-plus"></i>{" "}
                    </button>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-pb-con">
                    <p>{project.progress}%</p>

                    <div className="progress-bar">
                      {(() => {
                        const filledCount = Math.floor(project.progress / 10);
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
                        return Array.from({ length: 10 }).map((_, index) => (
                          <span
                            key={index}
                            className="dot"
                            style={{
                              backgroundColor:
                                index < filledCount ? filledColor : emptyColor,

                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                              marginRight: "1px",
                            }}
                          ></span>
                        ));
                      })()}
                    </div>
                  </div>
                  {project.assignedTo && project.assignedTo.name ? (
                    <span className="flex-row">
                      <p className="project-dashboard-assignedTo">
                        {project.assignedTo.name}
                      </p>
                      <p className="project-dashboard-assignedTo2">
                        {project.assignedTo.email}
                      </p>
                    </span>
                  ) : (
                    <p>Not assigned</p>
                  )}
                </div>
              ))}
            </div>
          </div> */}
          <div className="pro-box">
            <div className="pro-box-heading-user-dashboard">
              <p style={{ borderBottomColor: " #2D6A8F" }}>
                In-Progress <span>{inProgressProjects.length}</span>
              </p>
            </div>
            <div className="All-projects-cards userdashboard-pro-box">
              {inProgressProjects.map((project) => (
                <div
                  className="project-all-card userdashboard-pro-boxss"
                  key={project._id}
                >
                  <div className="status-btn flex-row">
                    <p
                      style={{
                        backgroundColor:
                          project.status === "Pending"
                            ? "rgba(252, 169, 2, 0.97)"
                            : project.status === "In Progress"
                            ? "rgba(252, 2, 186, 0.97)"
                            : project.status === "Completed"
                            ? "rgba(37, 115, 241, 0.97)"
                            : "#006400",
                        color:
                          project.status === "Pending"
                            ? "rgba(255, 255, 255, 0.97)"
                            : project.status === "In Progress"
                            ? "rgba(247, 242, 245, 0.97)"
                            : project.status === "Completed"
                            ? "rgba(236, 236, 236, 0.97)"
                            : "transparent",
                        padding: "5px 7px",
                        borderRadius: "10px",
                        width: "fit-content",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                    >
                      {project.status}
                    </p>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-pb-con">
                    <p>{project.progress}%</p>

                    <div className="progress-bar">
                      {(() => {
                        const filledCount = Math.floor(project.progress / 10);
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
                        return Array.from({ length: 10 }).map((_, index) => (
                          <span
                            key={index}
                            className="dot"
                            style={{
                              backgroundColor:
                                index < filledCount ? filledColor : emptyColor,

                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                              marginRight: "1px",
                            }}
                          ></span>
                        ));
                      })()}
                    </div>
                  </div>
                  {project.assignedTo && project.assignedTo.length > 0 ? (
                    <span className="flex-row">
                      <p
                        className="project-dashboard-assignedTo"
                        style={{
                          color: "red",
                          backgroundColor: "rgba(235, 129, 172, 0.45)",
                        }}
                      >
                        {project.assignedTo.map((emp) => emp.name).join(", ")}
                      </p>
                      <p
                        className="project-dashboard-assignedTo2"
                        style={{
                          color: "rgb(67, 6, 105)",
                          backgroundColor: "rgba(140, 27, 210, 0.36)",
                        }}
                      >
                        {project.assignedTo.map((emp) => emp.email).join(", ")}
                      </p>
                    </span>
                  ) : (
                    <p>Not assigned</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="pro-box">
            <div className="pro-box-heading-user-dashboard">
              <p style={{ borderBottomColor: " green" }}>
                Completed <span>{completedProjects.length}</span>
              </p>
            </div>
            <div className="All-projects-cards userdashboard-pro-box">
              {completedProjects.map((project) => (
                <div
                  className="project-all-card userdashboard-pro-boxss"
                  key={project._id}
                >
                  <div className="status-btn flex-row">
                    <p
                      style={{
                        backgroundColor:
                          project.status === "Pending"
                            ? "rgba(252, 169, 2, 0.97)"
                            : project.status === "In Progress"
                            ? "rgba(252, 2, 186, 0.97)"
                            : project.status === "Completed"
                            ? "rgba(37, 115, 241, 0.97)"
                            : "#006400",
                        color:
                          project.status === "Pending"
                            ? "rgba(255, 255, 255, 0.97)"
                            : project.status === "In Progress"
                            ? "rgba(247, 242, 245, 0.97)"
                            : project.status === "Completed"
                            ? "rgba(236, 236, 236, 0.97)"
                            : "transparent",
                        padding: "5px 7px",
                        borderRadius: "10px",
                        width: "fit-content",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                    >
                      {project.status}
                    </p>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-pb-con">
                    <p>{project.progress}%</p>

                    <div className="progress-bar">
                      {(() => {
                        const filledCount = Math.floor(project.progress / 10);
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
                        return Array.from({ length: 10 }).map((_, index) => (
                          <span
                            key={index}
                            className="dot"
                            style={{
                              backgroundColor:
                                index < filledCount ? filledColor : emptyColor,

                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                              marginRight: "1px",
                            }}
                          ></span>
                        ));
                      })()}
                    </div>
                  </div>
                  {project.assignedTo && project.assignedTo.length > 0 ? (
                    <span className="flex-row">
                      <p
                        className="project-dashboard-assignedTo"
                        style={{
                          color: "red",
                          backgroundColor: "rgba(235, 129, 172, 0.45)",
                        }}
                      >
                        {project.assignedTo.map((emp) => emp.name).join(", ")}
                      </p>
                      <p
                        className="project-dashboard-assignedTo2"
                        style={{
                          color: "rgb(67, 6, 105)",
                          backgroundColor: "rgba(140, 27, 210, 0.36)",
                        }}
                      >
                        {project.assignedTo.map((emp) => emp.email).join(", ")}
                      </p>
                    </span>
                  ) : (
                    <p>Not assigned</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardAllProjects;
