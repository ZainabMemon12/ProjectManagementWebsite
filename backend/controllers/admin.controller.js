const adminModel = require("../models/admin.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const RegisterAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role, skills, salary, projects } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "employee already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await adminModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      salary,
      projects,
    });

    // const AccessToken = jwt.sign(
    //     {
    //         newAdmin: {
    //             id: newAdmin._id,
    //             role: newAdmin.role,
    //             name: newAdmin.name

    //         },
    //     },
    //     process.env.SECRET_KEY,
    //     { expiresIn: "1h" }
    // );
    if (newAdmin) {
      res
        .status(200)
        .json({
          message: "employee created successfully",
          user: {
            id: newAdmin._id,
            name: newAdmin.name,
            role: newAdmin.role,
            skills: newAdmin.skills,
            salary: newAdmin.salary,
            projects: newAdmin.projects,
          },
        });
    } else {
      res.status(500).json({ message: "Failed to create employee" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering employee", error: error.message });
  }
});

const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel
      .findOne({ email })
      .populate("projects", "title description status priority progress");
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordvalid = await bcrypt.compare(password, admin.password);
    if (!isPasswordvalid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const AccessToken = jwt.sign(
      {
        admin: {
          id: admin._id,
          role: admin.role,
          name: admin.name,
          email: admin.email,
          skills: admin.skills,
          salary: admin.salary,
          projects: admin.projects,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        message: "logged in Successfully",
        AccessToken,
        user: {
          id: admin._id,
          name: admin.name,
          role: admin.role,
          email: admin.email,
          skills: admin.skills,
          salary: admin.salary,
          projects: admin.projects,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await adminModel
      .find({ role: "employee" })
      .populate("projects", "title description status priority progress");
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "error fetching employees" });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await adminModel
      .findById(id)
      .populate("projects", "title description status priority progress");
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "error fetching employee" });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await adminModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate("projects", "title description status priority progress");
    res.status(200).json({ employee, message: "updated Successfully" });
  } catch {
    res.status(500).json({ message: "error updating employee" });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await adminModel.findByIdAndDelete(id);
    res.status(200).json({ message: "employee deleted successfully" });
  } catch {
    res.status(500).json({ message: "error deleting employee" });
  }
};

module.exports = {
  RegisterAdmin,
  LoginAdmin,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
