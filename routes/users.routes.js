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
const validate = require("../middlewares/validate");
const {
  createUserValidator,
  registerValidator,
  loginValidator,
  idValidator,
} = require("../validator/users.validator");

const usersRoutes = express.Router();

// Get all users
usersRoutes.get("/", getAllUsers);

usersRoutes.post("/register", registerValidator, validate, register);
usersRoutes.post("/login", loginValidator, validate, login);

// Get single user
usersRoutes.get("/:id", idValidator, validate, getUserById);

// Create new user
usersRoutes.post("/", createUserValidator, validate, createUser);

// Update user
usersRoutes.patch("/:id", idValidator, createUserValidator, validate, updateUser);

// Delete user
usersRoutes.delete("/:id", idValidator, validate, deleteUser);

module.exports = usersRoutes;
