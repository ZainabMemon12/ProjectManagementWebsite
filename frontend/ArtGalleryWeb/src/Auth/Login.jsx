import React from 'react';
import { Form, Input, Button, Alert,Spin } from 'antd';
import UseLogin from '../hooks/UseLogin.jsx';
import './Login.css'
import "../responsive.css";

const Login = () => {
    const {error, loading, LoginUser} = UseLogin();
    const handleLogin = async (values) => {
        await LoginUser(values);
    };
    return (
        <>
        <div className="login-container">
          <div className="login-icon-con">
            <div className="login-icon">
            <i className="fa-regular fa-user fa-2xl"></i>
            </div>
            <div className="login-con">
                <Form onFinish={handleLogin} autoComplete='off'>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' },{type: "email", message: 'The input is not valid E-mail!' }]}>
                        <div className="input-con">
                       <div className="input-i"><i className="fa-solid fa-user"></i></div><Input placeholder='Email ID' /></div>

                    </Form.Item>
                    <Form.Item  name="password" rules={[{ required: true, message: 'Please input your password' }, { type: "password", message: 'The input is not valid password!' }]}>
                    <div className="input-con">
                    <div className="input-i"><i className="fa-solid fa-lock"></i></div><Input type='password' placeholder='Password' /></div>
                    </Form.Item>
                     {
                        error &&  <Alert description={error} type='error' showIcon closable className='alert' />
                    } 

                    <Form.Item>
                        <Button 
                         type={`${loading ? '' : 'primary'}`}
                         htmlType='submit'
                          className='login-btn'>
                             {loading ? <Spin/> : 'Log In'} 
                          </Button>
                    </Form.Item>
                </Form>


            </div>
            </div>
            </div>
        </>
    )
}

export default Login;