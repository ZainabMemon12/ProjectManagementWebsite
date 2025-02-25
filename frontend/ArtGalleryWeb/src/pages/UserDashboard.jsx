import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "antd";
import { Link } from "react-router-dom";
import UserLeftNav from "../components/UserLeftNav.jsx";
import { useState } from "react";
import UserNavbar from "../components/UserNavbar.jsx";

const UserDashboard = () => {
  const { userData, logout } = useAuth();
  const [showAllProjects, setShowAllProjects] = useState(false);
  console.log(userData);
  if (!userData) {
    return <div>Loading user data...</div>;
  }
  const projectCount = userData.projects?.length || 0;
  const projects = userData.projects || [];

  const projectsToDisplay =
    showAllProjects || projects.length <= 2 ? projects : projects.slice(0, 2);
  return (
    <>
      <div className="user-dashboard-con flex-row">
        <UserLeftNav />
        <div className="user-dashboard-main">
         <UserNavbar/>
          <div className="user-dashboard-cards-project-card">
            <div className="user-dashboard-left-all-cards">
              <div className="user-dashboard-cards">
                <div className="user-dashboard-card">
                  <div className="user-dashboard-card-icon-con">
                    <i className="ri-line-chart-line"></i>
                  </div>
                  <h3>Salary</h3>
                  <h1>
                    {userData.salary
                      ? new Intl.NumberFormat("en-PK", {
                          maximumFractionDigits: 0,
                        }).format(Number(userData.salary)) + "PKR"
                      : "N/A"}
                  </h1>
                  <p>+ 10% since last month</p>
                </div>
                <div className="user-dashboard-card2">
                  <div className="user-dashboard-card2-top flex-row">
                    <div className="user-dashboard-card2-top-icon-con">
                      <i className="ri-medal-line"></i>
                    </div>
                    <div className="user-dashboard-card2-top-txt">
                      <h5>{userData.skills}</h5>
                      <p>{userData.role}</p>
                    </div>
                  </div>

                  <div className="user-dashboard-card2-top">
                    <div className="flex-row">
                      <div className="user-dashboard-card2-top-icon-con userdash-card2">
                        <p>{projectCount}</p>
                      </div>
                      <div className="user-dashboard-card2-top-txt">
                        <h3>Projects</h3>
                      </div>
                    </div>
                    {projectCount > 0 ? (
                      <div className="flex-row">
                        {(projects.length > 2
                          ? projects.slice(0, 2)
                          : projects
                        ).map((project, index) => (
                          <p
                            className="user-dash-pro-title"
                            key={project._id || index}
                          >
                            {project.title}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="user-dash-pro-title">
                        No projects available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="user-dashboard-detail-card-heading">
                <h2>My Info</h2>
                <div className="user-dashboard-detail-card flex-row">
                  <div className="user-dashboard-detail-card-icon-con">
                    <i className="ri-account-pin-circle-line"></i>
                  </div>
                  <div className="user-dashboard-detail-card-txt">
                    <h3>My personal Info</h3>
                    <span className="flex-row">
                      <p className="user-data-heading">Name:</p>
                      <p className="user-data-fetch">{userData.name}</p>
                    </span>
                    <span className="flex-row">
                      <p className="user-data-heading">Email:</p>
                      <p className="user-data-fetch">{userData.email}</p>
                    </span>
                    <span className="flex-row">
                      <p className="user-data-heading">Skills:</p>
                      <p className="user-data-fetch">{userData.skills}</p>
                    </span>
                    <span className="flex-row">
                      <p className="user-data-heading">Role:</p>
                      <p className="user-data-fetch">{userData.role}</p>
                    </span>
                    <span className="flex-row">
                      <p className="user-data-heading">Salary:</p>
                      <p className="user-data-fetch">
                        {userData.salary
                          ? new Intl.NumberFormat("en-PK", {
                              maximumFractionDigits: 0,
                            }).format(Number(userData.salary)) + "PKR"
                          : "N/A"}
                      </p>
                    </span>
                  </div>
                  <div className="user-dashboard-icons-social-con flex-col">
                    <span className="user-dashboard-icon-social">
                      <i className="ri-linkedin-box-fill"></i>
                    </span>
                    <span className="user-dashboard-icon-social">
                      <i className="ri-github-fill"></i>
                    </span>
                    <span className="user-dashboard-icon-social">
                      <i className="ri-facebook-circle-fill"></i>
                    </span>
                    <span className="user-dashboard-icon-social">
                      <i className="ri-instagram-line"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-dashboard-right-pro-card-con">
              <h3>My Projects</h3>
              <div className="user-dashboard-right-pro-card1">
                {projectCount > 0 ? (
                  <div>
                    {projectsToDisplay.map((project, index) => (
                      <div
                        key={project._id || index}
                        className="project-item flex-row"
                      >
                        <span className="user-dashboard-right-pro-icon-con">
                          <i className="ri-macbook-line"></i>
                        </span>
                        <span className="user-dash-pro-card-heading-para">
                          <h5 className="user-dash-pro-title">
                            {project.title}
                          </h5>
                          <p>{project.status}</p>
                        </span>
                      </div>
                    ))}
                    {projects.length > 2 && (
                      <div className="see-projects-link">
                        {showAllProjects ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowAllProjects(false);
                            }}
                          >
                            See Less
                          </a>
                        ) : (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowAllProjects(true);
                            }}
                          >
                            See All Projects
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p
                    className="user-dash-pro-title"
                    style={{ fontSize: "12px", marginTop: "10px" }}
                  >
                    No projects available.
                  </p>
                )}
              </div>
              <h3 className="user-dashboard-right-pro-card2-h3">
                Project Details
              </h3>
              <div className="user-dashboard-right-pro-card2">
                <div className="pro-details">
                  <div className="flex-row">
                  <span className="user-dashboard-right-pro-icon-con">
                    <i className="ri-macbook-line"></i>
                  </span>
                  <span className="user-dash-pro-card-heading-para">
                    <h4 className="user-dash-pro-title">{userData.name}</h4>
                    <p>{userData.email}</p>
                  </span>
                  </div>
                  {projectCount > 0 ? (
                    <div className="user-dashboard-pro-priority-con">
                      {(projects.length > 1
                        ? projects.slice(0, 1)
                        : projects
                      ).map((project, index) => (
                        <p
                          className="user-dashboard-pro-priority"
                          key={project._id || index}
                        >
                          {project.priority}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="user-dashboard-pro-priority"
                      style={{ display: "none" }}
                    >
                      No project.
                    </p>
                  )}
                </div>
                {projectCount > 0 ? (
                  <div className="user-dashboard-pro-details">
                    {(projects.length > 1
                      ? projects.slice(0, 1)
                      : projects
                    ).map((project, index) => (
                      <span key={project._id || index}>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <p className="user-dashboard-pro-status">
                          {project.status}
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
                                emptyColor = "#FF4D4D";
                                filledColor = "#7D0000";
                              } else if (project.progress <= 60) {
                                emptyColor = "#FF8C42";
                                filledColor = "#8B4500";
                              } else {
                                emptyColor = "#A259FF";
                                filledColor = "#4B0082";
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
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", marginTop: "10px" }}>
                    No projects available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
