import './App.css';
import Navbar from './components/Navbar';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const host = "http://localhost:5000";

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);

  }

  const userDetail = async (req, res) => {
    if (localStorage.getItem('token')){
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        
      });
      
    }
  }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar userDetail={userDetail} />
        <Alert alert={alert} />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
