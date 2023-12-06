import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 假设您有一个对应的CSS文件来处理样式
import axios from "axios";

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual backend registration endpoint URL
      const response = await axios.post("/register", {
        email: email, // Assuming your backend expects 'email'
        username: username, // Add username to the request
        password: password
      });

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/login"); // Navigate to the login page on successful registration
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors here, such as displaying a notification
    }
  };
  /*const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: 实现注册逻辑，通常包括验证输入和向服务器发送数据

    // 假设注册成功，跳转到登录页面
    navigate('/login'); // 使用您的登录路由路径
  };*/

  return (
    <div className="login-wrapper">
      <div className="login-sidebar">
      </div>
      <div className="login-container">
        <div className="login-content">
          <h1>Welcome to Finland</h1>
          <p>The first step to your international experience and student life.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <p>*Must Be 8 Or More Characters</p>
          <button type="submit" className="register-button">CREATE AN ACCOUNT</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Register;
