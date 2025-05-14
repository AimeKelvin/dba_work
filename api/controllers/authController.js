import { registerUser, loginUser } from "../services/authService.js";

export const signup = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await registerUser(username, password, role);
    res.status(201).json({ message: "User registered successfully", user: { username: user.username, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { token, role } = await loginUser(username, password);
    res.status(200).json({ message: "Login successful", token, role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};