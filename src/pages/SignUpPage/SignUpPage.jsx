import "./SignUpPage.scss";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rePassword, setRePassword ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ height, setHeight ] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ age, setAge ] = useState('');
  const [handleError, setHandleError] = useState(false)
  const [messageError, setMessageError] = useState('')

  const navigate = useNavigate()
  const handlerSignup = async (e) => {
    e.preventDefault();
    const data = {firstname, lastname, email, password, rePassword, height, weight, age, birthdate, gender};
    try {
      await axios.post('http://localhost:8100/signup', data)
      navigate('/login')
    } catch (error) {
      setHandleError(true)
      setMessageError(error.response.data)
    }
  }

  useEffect(() => {
    setHandleError(false),
    setMessageError('')
  },[])

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
          <h3>Height (CM)<span> *</span></h3>
          <input type="text" placeholder="Enter your height" onChange={(e) => setHeight(e.target.value)} />
          <h3>Weight (KG)<span> *</span></h3>
          <input type="text" placeholder="Enter your weight" onChange={(e) => setWeight(e.target.value)} />
          <h3>Age (Year)<span> *</span></h3>
          <input type="text" placeholder="Enter you age" onChange={(e) => setAge(e.target.value)} />
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
            {
              handleError && (
                <div style={{color:'red'}}>
                  * {messageError}
                </div>
              )
            }
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