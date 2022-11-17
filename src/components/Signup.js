import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const { showAlert } = props;

  const [credentials, seCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let nevigate = useNavigate();

  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit button clicked");
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
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      nevigate("/");
      showAlert(`Accout Created Successfully with name ${credentials.name}`, "success");
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
      <div className='mt-3'>
        <h2>SignUp to continue to AllYouNeedNotebook App</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" value={credentials.name} id="name" name='name' onChange={onChange} minLength={3} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} minLength={5} required />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup