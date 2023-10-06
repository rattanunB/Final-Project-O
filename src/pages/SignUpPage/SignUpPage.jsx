import "./SignUpPage.scss";
import { useState } from 'react';

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

  const [ memberData, setMemberData ] = useState([ 
    {
      firstname: "admin",
      lastname: "admin",
      email: "admin@gmail.com",
      password: "1234",
      birthdate: new Date(),
      getder: "Male"
    }
  ]);

  const handlerSignup = (e) => {
    e.preventDefault();
    // console.log(`Complete clicking sign up`)
    if(!firstname || !lastname || !email || !password || !birthdate || !gender){
      return alert("Form invalid: Please fill empty form")
    }
    if(password !== rePassword){
      return alert("Passwords did not match, please check password and re-password again")
    }
    const data = {firstname, lastname, email, password, birthdate, gender};
    // console.log(data);
    setMemberData((prev) => [...prev, data]);
  }
  console.log(memberData);

  return (
    <div className="signUp-page">
      <div className="signUp-header">
        <h2>Sign Up</h2>
        <p>Already a member?
          <span>
            <a href="#">Log In</a>
          </span>
        </p>
      </div>
      <div className="signUp-form">
        <form className="signUp-input">
          <h3>First Name</h3>
          <input type="text" placeholder="Enter you first name" onChange={(e) => setFirstname(e.target.value)} />
          <h3>Last Name</h3>
          <input type="text" placeholder="Enter you last name" onChange={(e) => setLastname(e.target.value)} />
          <h3>E-Mail</h3>
          <input type="text" placeholder="Enter you e-mail" onChange={(e) => setEmail(e.target.value)} />
          <h3>Password</h3>
          <input type="password" placeholder="Enter you password" onChange={(e) => setPassword(e.target.value)} />
          <h3>Re-Password</h3>
          <input type="password" placeholder="Enter you password again" onChange={(e) => setRePassword(e.target.value)}/>
          <h3>Birthdate</h3>
          <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
          <div className="signUp-gender">
            <h3>Gender</h3>
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
          <div className="signUp-page-btn">
            <a className="signUp"><button onClick={handlerSignup}>Sign Up</button></a>
            <a className="signUp-google"><button><img/>Continue with Google</button></a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage;