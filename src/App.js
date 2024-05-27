import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const host = "https://allyouneednotebook-reactapp.onrender.com";

  const [alert, setAlert] = useState(null);

  const [userName, setUserName] = useState("");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const userDetail = async () => {
    if (localStorage.getItem("token")) {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const userName = await response.json();
      setUserName(userName.name);
    }
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar
            showAlert={showAlert}
            userDetail={userDetail}
            userName={userName}
          />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route
              exact
              path="/home"
              element={<Home showAlert={showAlert} />}
            />
            <Route
              exact
              path="/about"
              element={<About showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} userDetail={userDetail} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} userDetail={userDetail} />}
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
