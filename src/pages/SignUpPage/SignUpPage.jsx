import "./SignUpPage.scss";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

  const [ firstname, setFirstname ] = useState('');
  // console.log('Firstnmae:', firstname);

  const [ lastname, setLastname ] = useState('');
  // console.log('Lastname:',lastname);

  const [ email, setEmail ] = useState('');
  // console.log('E-mail:',email);

  const [ password, setPassword ] = useState('');
  // console.log('Password:', password);

  const [ rePassword, setRePassword ] = useState('');
  // console.log('Re-Password:', rePassword);

  const [ birthdate, setBirthdate ] = useState('');
  // console.log('Birthdate:', birthdate);

  const [ gender, setGender ] = useState('');
  // console.log('Gender:', gender);
  const navigate = useNavigate()
  const handlerSignup = async (e) => {
    e.preventDefault();
    if(!firstname || !lastname || !email || !password || !rePassword || !birthdate || !gender){
      return alert("Form invalid: Please fill empty form")
    }
    if(password !== rePassword){
      return alert("Passwords did not match, please check password and re-password again")
    }
    const data = {firstname, lastname, email, password, rePassword, birthdate, gender};
    // console.log(data);
    await axios.post('http://localhost:8100/signup', data)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })
    navigate('/login')
  }

  return (
    <div className="signup-page">
      <div className="signup-header">
        <h2>Sign Up</h2>
        <p>Already a member?
          <span>
            <a href="/login">Log In</a>
          </span>
        </p>
      </div>
      <div className="signup-form">
        <form className="signup-input">
          <h3>First Name<span> *</span></h3>
          <input type="text" placeholder="Enter you first name" onChange={(e) => setFirstname(e.target.value)} />
          <h3>Last Name<span> *</span></h3>
          <input type="text" placeholder="Enter you last name" onChange={(e) => setLastname(e.target.value)} />
          <h3>E-Mail<span> *</span></h3>
          <input type="text" placeholder="Enter you e-mail" onChange={(e) => setEmail(e.target.value)} />
          <h3>Password<span> *</span></h3>
          <input type="password" placeholder="Enter you password" onChange={(e) => setPassword(e.target.value)} />
          <h3>Re-Password<span> *</span></h3>
          <input type="password" placeholder="Enter you password again" onChange={(e) => setRePassword(e.target.value)}/>
          <h3>Birthdate<span> *</span></h3>
          <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
          <div className="signup-gender">
            <h3>Gender<span> *</span></h3>
            <div className="select-gender">
              <div className="gender-male">
                <input type="radio" value="Male" name="gender" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="Male">Male</label>
              </div>
              <div className="gender-female">
                <input type="radio" value="Female" name="gender" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="Female">Female</label>
              </div>
            </div>
          </div>
          <div className="signup-page-btn">
            <a className="signup" href="/login">
              <button onClick={handlerSignup}>Sign Up</button>
            </a>
            <a className="cancel" href="/">
              <button>Cancel</button>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage;