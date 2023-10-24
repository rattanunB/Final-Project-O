import React, { useState, useEffect } from 'react';
import "./LoginPage.scss";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({setAuth}) => {

  const [handleError, setHandleError] = useState(false)
  const [messageError, setMessageError] = useState('')

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
    try {
      const res = await axios.post('http://localhost:8100/login', formData)
      localStorage.setItem('accessToken', res.data.token)
      setAuth(true)      
      navigate('/')
    } catch (error) {
      setHandleError(true)
      setMessageError(error.response.data)
    }
  };

  useEffect(() => {
    setHandleError(false)
    setMessageError('')
  },[])
    
  return (
    <div className="loginPage">
      <h2>Login</h2>
      <div className='goSignup'><span>Don't have an account?</span><Link to="/signup" className='goSignupPage'>Sign Up</Link></div>      
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
        {
          handleError && (
            <div style={{color:'red'}}>
              * {messageError}
            </div>
          )
        }
        <div className='loginBtnWrap'>
            <button type="submit">Login</button>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;