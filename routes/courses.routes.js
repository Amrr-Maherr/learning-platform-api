const express = require("express");

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller");
const validate = require("../middlewares/validate");
const { createCourseValidator, idValidator } = require("../validator/courses.validator");

const coursesRoutes = express.Router();

// Get all courses
coursesRoutes.get("/", getAllCourses);

// Get single course
coursesRoutes.get("/:id", getCourseById);

// Create new course
coursesRoutes.post("/", createCourseValidator, validate, createCourse);

// Update course
coursesRoutes.patch("/:id", idValidator, createCourseValidator, validate, updateCourse);

// Delete course
coursesRoutes.delete("/:id", deleteCourse);

module.exports = coursesRoutes;
