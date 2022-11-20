import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {

    const { userDetail, userName } = props;

    const host = "http://localhost:5000";

    let nevigate = useNavigate();

    let location = useLocation();
    useEffect(() => {
        userDetail()
    }, [location]);

    const handleLogout = () => {
        localStorage.clear();
        nevigate("/login");

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand mb-0 h1" to="/">AllYouNeedNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to={'/login'} role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to={'/signup'} role="button">Signup</Link>
                        </form> : <>
                            <div className="dropdown">
                                
                                <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Welcome {userName}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item btn btn-secondary" onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                            </>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar