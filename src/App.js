import './App.css';
import Navbar from './components/Navbar';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
