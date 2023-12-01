import React from "react";
import Home from "./Components/Home";
import Department from "./Components/Department";
import Employee from "./Components/Employee";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h3 className="d-flex justify-content-center">YAw!!</h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <Link className="btn btn-light btn-outline-primary" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item- m-1">
                <Link
                  className="btn btn-light btn-outline-primary"
                  to="/department"
                >
                  Department
                </Link>
              </li>
              <li className="nav-item- m-1">
                <Link
                  className="btn btn-light btn-outline-primary"
                  to="/employee"
                >
                  Employee
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <Link className="btn btn-light btn-outline-primary" to="/login">
                  LogIn
                </Link>
              </li>
              <li className="nav-item- m-1">
                <Link
                  className="btn btn-light btn-outline-primary"
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/department" element={<Department />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
