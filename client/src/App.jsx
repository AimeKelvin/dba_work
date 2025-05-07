import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

const App = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/welcome"
          element={user ? <Welcome /> : <Navigate to="/signup" />}
        />
      </Routes>
    </Router>
  );
};

export default App;