import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './css/Login.scss';
import logo from './logo & image/LoginLogo.png'
import loginimg from './logo & image/welcome-6482989_1280.png';

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
        <body className='loginbody'>
            
        
        <div className="container">
            <div className="main-login">
                <div className='mt-3'>
                    <h2>Login to continue to AllYouNeedNotebook App</h2>
                    <div className="login-contain">
                        <div className="left-side">
                            <div className="img-class">
                                <img src={logo} id="img-id" alt="img" />
                            </div>

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
                            <button type="submit" className="btn btn-primary" id='sub-button'>Submit</button>
                        </form>

                        <div className="footer mt-4">
                            <h6>Don't have an Account ? <Link className='link' to={'/signup'}>Signup</Link></h6>
                        </div>

                        </div>
                        <div className="right-side">
                            <div className="welcomeNote">
                                <h3>welcome back!</h3>
                            </div>

                            <div className="welcomeImg">
                                <img src={loginimg} id='wel-img-id' alt="" />
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

export default Login