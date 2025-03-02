import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchProjects from "../hooks/FetchProjects";
import { Spin } from "antd";
import { message } from "antd";

const SixProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await FetchProjects();
        const inProgressProjects = data.filter(
          (project) => project.status === "In Progress"
        );
        setProjects(inProgressProjects.slice(0, 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);
  if (loading) {
    return (
      <div className="cards">
        <Spin className="loader" />
      </div>
    );
  }
  if (error) {
    return message.error("Error fetching data");
  }
  return (
    <>
      <div className="six-projects">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="project-card-admindshboard">
              <div
                className="project-icon-con"
                style={{
                  backgroundColor:
                    project.priority === "high"
                      ? "#800020"
                      : project.priority === "medium"
                      ? "#9C5600"
                      : project.priority === "low"
                      ? "#4B0082 "
                      : "transparent",
                  color:
                    project.priority === "high"
                      ? "#FF8FA3"
                      : project.priority === "medium"
                      ? "#FFBF69"
                      : project.priority === "low"
                      ? "#D8BFD8"
                      : "transparent",
                }}
              >
                <i className="ri-macbook-line"></i>
              </div>
              <h4>{project.title}</h4>
              <p className="project-dashboard-p">
                    {project.description.length > 92
                      ? project.description.substring(0, 92) + "..."
                      : project.description}
                  </p>
              <p
                style={{
                  backgroundColor:
                    project.priority === "high"
                      ? "#800020"
                      : project.priority === "medium"
                      ? "#9C5600"
                      : project.priority === "low"
                      ? "rgba(76, 0, 130, 0.58) "
                      : "transparent",
                  color:
                    project.priority === "high"
                      ? "#FF8FA3"
                      : project.priority === "medium"
                      ? "#FFBF69"
                      : project.priority === "low"
                      ? "#D8BFD8"
                      : "transparent",
                  padding: "5px 4px",
                  borderRadius: "5px",
                  width: "fit-content",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {project.priority}
              </p>

              
              {project.assignedTo && project.assignedTo.length > 0 ? (
  <p className="project-dashboard-assignedTo">
    {project.assignedTo.map((employee) => employee.name).join(", ")}
  </p>
) : (
  <p>Not assigned</p>
)}

  <p className="project-dashboard-status">{project.status} <i className="ri-arrow-up-long-line arrow-icon"></i></p>
            </div>
          ))
        ) : (
          <p>No in-progress projects found.</p>
        )}
      </div>
    </>
  );
};

export default SixProjects;
