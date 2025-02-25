const Project = require("../models/project.model.js");
const Admin = require("../models/admin.model.js");

const addProject = async (req, res) => {
  const { title, description, status, assignedTo, priority,progress } = req.body;

  try {
    const existingProject = await Project.findOne({ title });
        if (existingProject) {
            return res.status(400).json({ message: "project already exist" });
        }
    const newProject = await Project.create({
      title,
      description,
      status,
      assignedTo,
      priority,
      progress
    });

    for (const adminId of assignedTo) {
      await Admin.findByIdAndUpdate(adminId, { $push: { projects: newProject._id } });
    }

    res.status(200).json({message:"project created successfully",newProject});
  } catch (error) {
    res.status(400).json({ error: "ERROR. Try again.", error });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.find().populate('assignedTo', 'name email');
    if (!projects) {
      return res.status(400).json({ error: "No projects found." });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects", error });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate('assignedTo', 'name email');
    if (!project) {
      return res.status(400).json({ error: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error });
  }
};

const updateProject = async (req, res) => {
  try {
    const currentProject = await Project.findById(req.params.id);
    if (!currentProject) {
      return res.status(400).json({ error: "Project not found." });
    }
    
   
    const oldAssignedTo = currentProject.assignedTo.map(id => id.toString());
    const newAssignedTo = req.body.assignedTo || oldAssignedTo;

    
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    
    const removedAdmins = oldAssignedTo.filter(adminId => !newAssignedTo.includes(adminId));
    const addedAdmins = newAssignedTo.filter(adminId => !oldAssignedTo.includes(adminId));

    
    for (const adminId of removedAdmins) {
      await Admin.findByIdAndUpdate(adminId, { $pull: { projects: updatedProject._id } });
    }
 
    for (const adminId of addedAdmins) {
      await Admin.findByIdAndUpdate(adminId, { $push: { projects: updatedProject._id } });
    }

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (err) {
    res.status(400).json({ error: "Update Failed", err });
  }
};


const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(400).json({ error: "Project not found." });
    }
    for (const adminId of project.assignedTo) {
      await Admin.findByIdAndUpdate(adminId, { $pull: { projects: project._id } });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Process failed. Try again.", err });
  }
};


module.exports = {
  getProject,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
};