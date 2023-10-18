import React, { useState } from 'react';
import "./LoginPage.scss";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({setAuth}) => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
    
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('ข้อมูลที่ส่งไปยังเซิร์ฟเวอร์:', formData);
    try {
      const res = await axios.post('http://localhost:8100/login', formData)
      console.log(res.data.token)
      localStorage.setItem('accessToken', res.data.token)
      setAuth(true)
      navigate('/')
    } catch (error) {
      alert(error.response.data)
    }
  };
    
  return (
    <div className="loginPage">
      <h2>Login</h2>
      <div className='goSignup'><span>Don,t have an account?</span><Link to="/signup" className='goSignupPage'>Signup</Link></div>      
      <form onSubmit={handleSubmit}>
        <div className="loginWrapInput">
          <label>Email</label>
          <input
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange}
          />
        </div>
        <div className="loginWrapInput">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className='loginBtnWrap'>
            <button type="submit">Login</button>
            <button>Continue With Google</button>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;