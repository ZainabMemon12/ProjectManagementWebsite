import React from 'react';
import { Form, Input, Button, Alert, Spin, Radio } from 'antd';
import UseEmployee from '../hooks/UseEmployee.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx';
import AdminLeftNav from '../components/AdminLeftNav.jsx';


const CreateEmployee = () => {
    const { error, loading, AddEmployee } = UseEmployee();
    const handlesubmitEmployee = async (values) => {
        await AddEmployee(values);
    };
    return (
        <>
            <div className="admin-dashboard">
                <AdminNavbar />
                <div className="admin-main">
                    <AdminLeftNav />
                    <div className="admin-main-right create-employee-comp-admin-main-right">
                        <div className="add-employee-con">
                            <h1>Add New Employee</h1>

                            <Form onFinish={handlesubmitEmployee} autoComplete='off'>
                                <div className="add-name-email-con">
                                    <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name' }, { type: "text", message: 'The input is not valid name!' }]}>
                                        <div className="input-con">
                                            <div className="input-i"><i className="fa-solid fa-user"></i></div><Input placeholder='Name' /></div>

                                    </Form.Item>
                                    <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: "email", message: 'The input is not valid E-mail!' }]}>
                                        <div className="input-con">
                                            <div className="input-i"><i className="fa-solid fa-envelope"></i></div><Input placeholder='Email ID' /></div>

                                    </Form.Item>
                                </div>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password' }]}>
                                    <div className="input-con">
                                        <div className="input-i"><i className="fa-solid fa-lock"></i></div><Input placeholder='Password' type='password' /></div>
                                </Form.Item>
                                <Form.Item name="role" label={<span style={{ color: 'white' }}>Select a role!</span>}
                                    rules={[{ required: true, message: 'Please select an option!' }]}>
                                    <Radio.Group>
                                        <Radio className='radio' value="admin">admin</Radio>
                                        <Radio className='radio' value="employee">employee</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {
                                    error && <Alert description={error} type='error' showIcon closable className='alert' />
                                }

                                <Form.Item>
                                    <Form.Item name="skills" rules={[{ required: true, message: 'Please enter employee skill' }, { type: "text", message: 'The input is not valid skill!' }]}>
                                        <div className="input-con">
                                            <div className="input-i"><i className="fa-solid fa-laptop"></i></div><Input placeholder='Skill' /></div>

                                    </Form.Item>
                                    <Form.Item name="salary" rules={[{ required: true, message: 'Please enter employee salary' }, { type: "Number", message: 'The input is not valid salary!' }]}>
                                        <div className="input-con">
                                            <div className="input-i"><i className="fa-solid fa-money-bill"></i></div><Input placeholder='Salary' /></div>

                                    </Form.Item>
                                    <Button
                                        type={`${loading ? '' : 'primary'}`}
                                        htmlType='submit'
                                        className='login-btn'>
                                        {loading ? <Spin /> : 'Register'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateEmployee;