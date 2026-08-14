const express = require("express");

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller");

const coursesRoutes = express.Router();

// Get all courses
coursesRoutes.get("/", getAllCourses);

// Get single course
coursesRoutes.get("/:id", getCourseById);

// Create new course
coursesRoutes.post("/", createCourse);

// Update course
coursesRoutes.patch("/:id", updateCourse);

// Delete course
coursesRoutes.delete("/:id", deleteCourse);

module.exports = coursesRoutes;
