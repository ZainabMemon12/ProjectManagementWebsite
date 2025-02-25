import React, { useState, useEffect } from "react";
import UserLeftNav from "../components/UserLeftNav";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectById, updateProject } from "../hooks/FetchEditProject.js";
import { Spin } from "antd";

const EditUserProject = () => {
  const { userData, updateUserData } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(null);

  const [formData, setFormData] = useState({
    status: "",
    priority: "",
    progress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const project = await fetchProjectById(id);
        setProjectData(project);
        setFormData({
          status: project.status,
          priority: project.priority,
          progress: project.progress,
        });
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to fetch project data.");
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      ...projectData,
      ...formData,
    };

    updateUserData({
      ...userData,
      projects: userData.projects.map((project) =>
        project._id === id ? updatedProject : project
      ),
    });

    try {
      await updateProject(id, formData);
      alert("Project updated successfully!");
      navigate("/userdashboard-projects");
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/userdashboard-projects");
  };


  if (error) return <div>{error}</div>;

  return (
    <div className="user-dashboard-con flex-row">
      <UserLeftNav />
      <div className="user-dashboard-main">
        <div className="user-dashboard-heading-search flex-row">
          <h2>
            <strong>Welcome,</strong> {userData.name}!
          </h2>
          <div className="user-search-bar flex-row">
            <i className="ri-search-2-line"></i>
            <input type="search" placeholder="Search for projects" />
          </div>
        </div>
        <div className="profile-heading flex-row">
          <div className="profile-empt-con"></div>
          <h3>Edit Project</h3>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spin/>
            
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        ) : (
          <div className="edit-project-form-container">
            <form onSubmit={handleSubmit} className="flex-col">
              <div className="profile-edit">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="profile-edit">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="profile-edit">
                <label htmlFor="progress">Progress:</label>
                <input
                  id="progress"
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
              <div className="profile-edit-btn-con">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUserProject;
