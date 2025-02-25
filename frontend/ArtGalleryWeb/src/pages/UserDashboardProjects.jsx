import React from "react";
import UserLeftNav from "../components/UserLeftNav";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar.jsx";

const UserDashboardProjects = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  if (!userData || !userData.projects) {
    return <div>Loading projects...</div>;
  }

  return (
    <>
      <div className="user-dashboard-con flex-row">
        <UserLeftNav />
        <div className="user-dashboard-main">
        <UserNavbar/>
          <div className="profile-heading flex-row">
            <div className="profile-empt-con"></div>
            <h3>My Projects</h3>
          </div>
          <div className="user-projects">
            {userData.projects.length === 0 ? (
              <div>Admin didnt assign any project!!</div>
            ) : (
              userData.projects.map((project) => (
                <div key={project._id} className="user-dashboard-em-pro">
                  <span
                    className="flex-row"
                    style={{ justifyContent: "space-between" }}
                  >
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
                        fontSize: "12px",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      {project.status}
                    </p>
                    <button
                      className="user-edit-btn"
                      onClick={() => navigate(`/edit-user-project/${project._id}`)}
                    >
                      <i className="fa-regular fa-plus"></i>
                    </button>
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p
                    style={{
                      backgroundColor:
                        project.priority === "high"
                          ? "rgba(255, 0, 0, 0.25)"
                          : project.priority === "medium"
                          ? "rgba(172, 255, 47, 0.71)"
                          : project.priority === "low"
                          ? "rgba(82, 74, 80, 0.36)"
                          : "transparent",
                      color:
                        project.priority === "high"
                          ? "red"
                          : project.priority === "medium"
                          ? "green"
                          : project.priority === "low"
                          ? "rgba(78, 75, 77, 0.97)"
                          : "transparent",
                      padding: "5px 7px",
                      borderRadius: "5px",
                      width: "fit-content",
                      textAlign: "center",
                      fontSize: "12px",
                      marginTop: "10px",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    {project.priority}
                  </p>
                  <div className="project-pb-con">
                    <p>{project.progress}%</p>
                    <div className="progress-bar">
                      {(() => {
                        const filledCount = Math.floor(project.progress / 10);
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
                        return Array.from({ length: 10 }).map((_, index) => (
                          <span
                            key={index}
                            className="dot"
                            style={{
                              backgroundColor:
                                index < filledCount ? filledColor : emptyColor,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              marginRight: "1px",
                            }}
                          ></span>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardProjects;
