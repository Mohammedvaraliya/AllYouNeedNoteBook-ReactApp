import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './css/Login.css';

const Login = (props) => {

    const { showAlert, userDetail } = props;

    const [credentials, seCredentials] = useState({ email: "", password: "" });
    let nevigate = useNavigate();

    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API cal
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            showAlert(`Successfully Logged in with email ${credentials.email}`, "success");
            nevigate("/");
        }
        else {
            showAlert("Invalid Credentials! Please try again", "danger");
        }
        userDetail();

    }

    const onChange = (e) => {
        seCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="card mt-3 shadow-sm p-4 bg-light">
            <h2 className="text-center mb-4">Login to continue to AllYouNeedNotebook App</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control form-control-lg" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control form-control-lg" value={credentials.password} id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">Submit</button>
            </form>
            <div className="text-center mt-4">
                <h6>Don't have an Account? <Link id="Links-signup" to={'/signup'}>Signup</Link></h6>
            </div>
            </div>
        </div>
        </>
    )
}

export default Login