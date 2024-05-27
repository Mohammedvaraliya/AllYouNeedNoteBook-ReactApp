import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import style from "./css/Signup.css";

const Signup = (props) => {
  const { showAlert, userDetail } = props;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  const host = process.env.REACT_APP_HOST;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    // API call
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    setLoader(false);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert(
        `Account Created Successfully with name ${credentials.name}`,
        "success"
      );
      userDetail();
    } else {
      showAlert("Invalid Details! Please try again", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card mt-3 shadow-sm p-4 bg-light">
          <h2 className="text-center mb-4">
            Create an account to use AllYouNeedNotebook App
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={credentials.name}
                id="name"
                name="name"
                onChange={onChange}
                minLength={3}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                value={credentials.email}
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={onChange}
                required
              />
              <div id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={credentials.password}
                id="password"
                name="password"
                onChange={onChange}
                minLength={5}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className={
                  credentials.password === credentials.cpassword
                    ? "form-control form-control-lg"
                    : "form-control form-control-lg is-invalid"
                }
                value={credentials.cpassword}
                id="cpassword"
                name="cpassword"
                onChange={onChange}
                minLength={5}
                required
              />
              {credentials.password !== credentials.cpassword && (
                <div className="invalid-feedback">Passwords do not match.</div>
              )}
            </div>

            <button
              disabled={
                credentials.password !== credentials.cpassword || loader
              }
              type="submit"
              className="btn btn-primary btn-lg w-100"
            >
              {loader ? <Loader /> : "Submit"}
            </button>
          </form>
          <div className="text-center mt-4">
            <h6>
              Already have an Account?{" "}
              <Link id="Links-signin" to={"/login"}>
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
