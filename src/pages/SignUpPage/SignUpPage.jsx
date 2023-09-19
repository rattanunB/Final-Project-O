import "./SignUpPage.css";

const SignUpPage = () => {
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
          <input type="text" placeholder="Enter you first name"/>
          <h3>Last Name</h3>
          <input type="text" placeholder="Enter you last name"/>
          <h3>E-Mail</h3>
          <input type="text" placeholder="Enter you e-mail"/>
          <h3>Password</h3>
          <input type="password" placeholder="Enter you password"/>
          <h3>Re-Password</h3>
          <input type="password" placeholder="Enter you password again"/>
          <h3>Birthdate</h3>
          <input type="date"/>
          <div className="signUp-gender">
            <h3>Gender</h3>
            <div className="select-gender">
              <div className="gender-male">
                <input type="radio" value="Male" name="gender" />
                <label for="Male" >Male</label>
              </div>
              <div className="gender-female">
                <input type="radio" value="Female" name="gender" />
                <label for="Female">Female</label>
              </div>
            </div>
          </div>
          <div className="signUp-page-btn">
            <a className="signUp"><button>Sign Up</button></a>
            <a className="signUp-google"><button><img/>Continue with Google</button></a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage;