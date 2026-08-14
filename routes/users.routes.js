const express = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
} = require("../controllers/users.controller");

const usersRoutes = express.Router();

// Get all users
usersRoutes.get("/", getAllUsers);

usersRoutes.post("/register", register);
usersRoutes.post("/login", login);

// Get single user
usersRoutes.get("/:id", getUserById);

// Create new user
usersRoutes.post("/", createUser);

// Update user
usersRoutes.patch("/:id", updateUser);

// Delete user
usersRoutes.delete("/:id", deleteUser);

module.exports = usersRoutes;
