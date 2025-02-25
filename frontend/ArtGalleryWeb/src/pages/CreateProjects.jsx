import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert, Spin, Select, Radio } from "antd";
import UseProject from "../hooks/UseProjects.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";
import AdminLeftNav from "../components/AdminLeftNav.jsx";
import FetchEmployees from "../hooks/FetchEmployees";

const { Option } = Select;

const CreateProjects = () => {
  const { error, loading, createProject } = UseProject();
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await FetchEmployees();
        setEmployeeList(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    getEmployees();
  }, []);
  const handleSubmitProject = async (values) => {
    await createProject(values);
  };
  return (
    <>
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="admin-main">
          <AdminLeftNav />
          <div className="admin-main-right">
            <div className="add-employee-con">
              <h1>Add New Project</h1>

              <Form onFinish={handleSubmitProject} autoComplete="off">
                <Form.Item
                  name="title"
                  rules={[
                    { required: true, message: "Please enter project title!" },
                    { type: "text", message: "The input is not title!" },
                  ]}
                >
                  <div className="input-con">
                    <div className="input-i">
                      <i className="fa-solid fa-heading"></i>
                    </div>
                    <Input placeholder="Title" />
                  </div>
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Please enter a description!" },
                  ]}
                >
                  <div className="input-con">
                    <div className="input-i">
                      <i className="fa-solid fa-align-left"></i>
                    </div>
                    <Input.TextArea
                      placeholder="Enter description"
                      autoSize={{ minRows: 6, maxRows: 8 }}
                      className="description-textarea"
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="priority"
                  label={
                    <span style={{ color: "white" }}>Select a priority!</span>
                  }
                  rules={[
                    { required: true, message: "Please select an option!" },
                  ]}
                >
                  <Radio.Group>
                    <Radio className="radio" value="low">
                      low
                    </Radio>
                    <Radio className="radio" value="medium">
                      medium
                    </Radio>
                    <Radio className="radio" value="high">
                      high
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="assignedTo"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please select at least one employee!",
                  //   },
                  // ]}
                >
                  <Select
                   mode="multiple"  
                    name="assignedTo"
                    placeholder="Select employees"
                    className="select-bg"
                  >
                    {employeeList.map((employee) => (
                      <Option
                        key={employee._id}
                        value={employee._id}
                        className="dropdown"
                      >
                        {employee.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {error && (
                  <Alert
                    description={error}
                    type="error"
                    showIcon
                    closable
                    className="alert"
                  />
                )}

                <Form.Item>
                  <Button
                    type={`${loading ? "" : "primary"}`}
                    htmlType="submit"
                    className="login-btn"
                  >
                    {loading ? <Spin /> : "Add project"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjects;
