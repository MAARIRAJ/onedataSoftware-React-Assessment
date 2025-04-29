import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Signup from "./pages/Signup";

// No props, so we can type this simply as React.FC
const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar px-3 mb-4" style={{ backgroundColor: "#12264F" }}>
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "#3E7CB1" }}
        >
          Job Portal
        </Link>
        <div>
          <Link to="/login" className="btn btn-outline-primary me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-warning">
            Signup
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
