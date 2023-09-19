import React, { useState } from 'react'
import "./LoginPage.css"

const LoginPage = () => {
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
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('ข้อมูลที่ส่งไปยังเซิร์ฟเวอร์:', formData);
      };
    
      return (
        <div className="loginPage">
          <h2>Login</h2>
          <div><span>Don,t have an account?</span><span>Signup</span></div>      
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
            <div className='activityBtnWrap'>
                <button type="submit">Login</button>
                <button>Continue With Google</button>
            </div>
    
          </form>
        </div>
      );
}

export default LoginPage