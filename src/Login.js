import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });

      if (response.status === 200 && response.data.token) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        // Example: After successful login
        
        navigate('/');
      } else {
        setEmailError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Request failed:', error);
      setPasswordError('Incorrect username or password');
    }
  };

  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', response.data.token); // 保存token
      navigate('/Home'); // 登录成功后跳转到首页
    } catch (error) {
      console.error('Login failed:', error);
      // 处理登录失败
    }
  };*/

  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // 构建要发送到服务器的登录数据
    const loginData = {
      email: email,
      password: password
    };
  
    try {
      // 发送POST请求到登录接口
      const response = await fetch('/api/login', { // 这里的URL '/api/login' 需要替换成实际的登录API端点
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      // 将响应解析为JSON
      const data = await response.json();
  
      // 检查响应状态
      if (response.ok) {
        // 登录成功，可以将返回的用户数据存储到状态管理中
        // 例如使用React Context, Redux或者简单地保存到localStorage
        console.log('登录成功:', data);
        
        // 可以选择保存token到localStorage或sessionStorage
        localStorage.setItem('token', data.token);
  
        // 跳转到主页
        navigate('/home');
      } else {
        // 登录失败，显示错误信息
        console.error('登录失败:', data.message);
        // 这里可以设置错误状态，并在UI中显示错误信息
      }
    } catch (error) {
      // 网络错误或请求失败
      console.error('请求失败:', error);
      // 这里可以设置错误状态，并在UI中显示错误信息
    }
  };
  
  /*const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: 实现登录验证逻辑
    // 假设验证成功后，跳转到主页
    navigate('/Home'); // 假设您的主页路由是 '/home'
  };
  */

  const handleSignUp = () => {
    navigate('/register'); // 假设您的注册页面路由是 '/register'
  };

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
            {emailError && <div className="error-message">{emailError}</div>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
            <div className="form-footer">
              <label>
                <input type="checkbox" name="remember" /> Remember Me
              </label>
              <button type="submit" className="login-button">LOGIN</button>
            </div>
          </form>
          <div className="signup-link">
            Don't Have An Account? <span onClick={handleSignUp}>Sign Up!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;