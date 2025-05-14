import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users if the logged-in user is an admin
  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role !== "admin") {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  // Handle user deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((u) => u._id !== id)); // Remove the deleted user from the state
      alert("User deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
        <p className="mb-6">You are logged in successfully.</p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded mb-6"
        >
          Logout
        </button>

        {user?.role === "admin" && (
          <div>
            <h2 className="text-xl font-bold mb-4">User Management Dashboard</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Delete
                      </button>
                      {/* Add edit functionality here */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;