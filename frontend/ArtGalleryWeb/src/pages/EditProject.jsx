import React, { useState, useEffect } from "react";
import AdminLeftNav from "../components/AdminLeftNav";
import AdminNavbar from "../components/AdminNavbar";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectById, updateProject, deleteProject } from "../hooks/FetchEditProject";
import { Spin, Select } from "antd";
import FetchEmployees from "../hooks/FetchEmployees";
import { message, Modal } from "antd";

const { Option } = Select;

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    status: "",
    assignedTo: [], // now an array for multiple selection
    priority: "",
    progress: "",
    createdAt: "",
    updatedAt: "",
  });
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        setLoading(true);
        const data = await fetchProjectById(id);
        setProject(data);
        setUpdatedData({
          title: data.title,
          description: data.description,
          status: data.status,
          assignedTo: Array.isArray(data.assignedTo)
            ? data.assignedTo.map((assignee) =>
                typeof assignee === "string" ? assignee : assignee._id
              )
            : [typeof data.assignedTo === "string" ? data.assignedTo : data.assignedTo?._id],
          priority: data.priority,
          progress: data.progress,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await FetchEmployees();
        setEmployees(data);
      } catch (err) {
        setEmployeesError(err.message);
      } finally {
        setEmployeesLoading(false);
      }
    };

    getEmployees();
  }, []);

  // Standard change handler for text/radio inputs
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateProject(id, updatedData);
      const updatedProject = await fetchProjectById(id);
      setProject(updatedProject);
      message.success("Project details updated successfully!");
    } catch (err) {
      setError(err.message);
      message.error("Failed to update project!");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you really want to delete this project? This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteProject(id);
          message.success("Project deleted successfully!");
          navigate("/All-projects");
        } catch (err) {
          setError(err.message);
          message.error("Failed to delete project!");
        }
      },
    });
  };

  // Helper to return an array of assigned employee objects
  const getAssignedEmployees = () => {
    if (!project || !employees.length) return [];
    const assigned = Array.isArray(project.assignedTo)
      ? project.assignedTo
      : [project.assignedTo];
    return assigned
      .map((assignee) => {
        const assignedId = typeof assignee === "string" ? assignee : assignee._id;
        return employees.find((emp) => emp._id.toString() === assignedId.toString());
      })
      .filter(Boolean);
  };

  const assignedEmployees = getAssignedEmployees();

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="admin-main">
          <AdminLeftNav />
          <div className="admin-main-right" style={{ height: "100vh" }}>
            <Spin
              size="large"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="admin-main">
          <AdminLeftNav />
          <div className="admin-main-right">
            <div>No project data available.</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-main">
        <AdminLeftNav />
        <div className="admin-main-right edit-pro-res">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Spin />
            </div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              <div className="edit-details-pro-con">
                <div className="Edit-pro-con">
                  <h2>Update Project</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex-col">
                      <label>Title:</label>
                      <input type="text" name="title" value={updatedData.title} onChange={handleChange} />
                    </div>
                    <div className="flex-col">
                      <label>Description:</label>
                      <textarea rows="10" cols="10" name="description" value={updatedData.description} onChange={handleChange} />
                    </div>
                    <div className="flex-col" style={{ marginTop: "10px" }}>
                      <div>
                        <label className="radio-label pending">
                          <input type="radio" name="status" value="Pending" checked={updatedData.status === "Pending"} onChange={handleChange} />
                          <span>Pending</span>
                        </label>
                        <label className="radio-label in-progress">
                          <input type="radio" name="status" value="In Progress" checked={updatedData.status === "In Progress"} onChange={handleChange} />
                          <span>In Progress</span>
                        </label>
                        <label className="radio-label completed">
                          <input type="radio" name="status" value="Completed" checked={updatedData.status === "Completed"} onChange={handleChange} />
                          <span>Completed</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="radio-label high">
                          <input type="radio" name="priority" value="high" checked={updatedData.priority === "high"} onChange={handleChange} />
                          <span>High</span>
                        </label>
                        <label className="radio-label medium">
                          <input type="radio" name="priority" value="medium" checked={updatedData.priority === "medium"} onChange={handleChange} />
                          <span>Medium</span>
                        </label>
                        <label className="radio-label low">
                          <input type="radio" name="priority" value="low" checked={updatedData.priority === "low"} onChange={handleChange} />
                          <span>Low</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex-col">
                      <label>Progress:</label>
                      <input type="text" name="progress" value={updatedData.progress} onChange={handleChange} />
                    </div>
                    <div className="flex-col">
                      <label>Assign To:</label>
                      {employeesLoading ? (
                        <Spin />
                      ) : employeesError ? (
                        <span>Error loading employees</span>
                      ) : (
                        <Select
                          mode="multiple"
                          placeholder="Select employees"
                          value={updatedData.assignedTo}
                          onChange={(value) => setUpdatedData({ ...updatedData, assignedTo: value })}
                          className="update-pro-select"
                          style={{
                            width: "100%",
                            background: "linear-gradient(45deg,rgb(8, 8, 52),rgb(103, 32, 197))",
                            color: "black",
                            border: "1px solid black",
                          }}
                        >
                          {employees.map((employee) => (
                            <Option key={employee._id} value={employee._id}>
                              {employee.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </div>
                    <button type="submit" disabled={isUpdating}>
                      {isUpdating ? <Spin size="small" /> : "Update Project"}
                    </button>
                  </form>
                </div>

                {/* Project Preview Card */}
                <div className="project-card-preview">
                  <div className="project-preview-txt flex-row">
                    <h3>{project.title}</h3>
                    <p className={`status-text ${project.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {project.status}
                    </p>
                  </div>
                  <p className={`priority-text ${project.priority.toLowerCase()}`}>
                    {project.priority}
                  </p>
                  <p className="pro-detail-description">{project.description}</p>
                  <p className="pro-emp-det">
                    {assignedEmployees.length > 0
                      ? assignedEmployees.map((emp) => emp.name).join(", ")
                      : "Not Assigned"}
                  </p>
                  <p className="pro-emp-det-em">
                    {assignedEmployees.length > 0
                      ? assignedEmployees.map((emp) => emp.email).join(", ")
                      : "Not Assigned"}
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
                              backgroundColor: index < filledCount ? filledColor : emptyColor,
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
                  <button className="pro-del-btn" onClick={handleDelete}>
                    Delete Project
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProject;
