import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Welcome = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.role}!</h2>
        <p className="mb-4">You are logged in successfully.</p>
        <button
          className="w-full bg-red-500 text-white p-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;