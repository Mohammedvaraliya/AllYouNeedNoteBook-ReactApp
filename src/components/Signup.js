import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './css/Signup.scss';
import logo from './logo & image/SignupLogo.png';
import registerImage from './logo & image/img.png';


const Signup = (props) => {

  const { showAlert, userDetail } = props;

  const [credentials, seCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let nevigate = useNavigate();

  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API cal
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      nevigate("/");
      showAlert(`Accout Created Successfully with name ${credentials.name}`, "success");
      userDetail();
    }
    else {
      showAlert("Invalid Details! Please try again", "danger");
    }
  }

  const onChange = (e) => {
    seCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
    <body className='signupbody'>
      <div className="container">
        <div className="main-Register">
          <div className='mt-3'>
            <h2>Login to continue to AllYouNeedNotebook App</h2>
            <div className="signup-contain">
              <div className="left-side">
                <div className="img-class">
                  <img src={logo} id="img-id" alt="img" />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" name='name' onChange={onChange} minLength={3} required />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} minLength={5} required />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                  </div>

                  <button disabled={credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary" id='sub-button'>Submit</button>
                </form>

                <div className="footer mt-4">
                  <h6>Already have an Account ? <Link id='Links-signin' to={'/login'} >Sign In</Link></h6>
                </div>

              </div>
              <div className="right-side">
                <div className="welcomeNote">
                  <h3>welcome again!</h3>
                </div>

                <div className="welcomeImg">
                  <img src={registerImage} id='sig-img-id' alt="" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      </body>
    </>
  )
}

export default Signup