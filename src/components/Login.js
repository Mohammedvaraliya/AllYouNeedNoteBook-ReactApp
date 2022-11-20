import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
            <div className='mt-3'>
                <h2>Login to continue to AllYouNeedNotebook App</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login