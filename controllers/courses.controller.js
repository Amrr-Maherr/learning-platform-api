const { db } = require("../config/db");
const getAllCourses = async (req, res) => {
  const allCourses = await db.courses_collection.find().toArray();
  res.status(200).json({
    message: "success",
    length: allCourses.length,
    data: {
      courses: allCourses,
    },
  });
};

const getCourseById = (req, res) => {
  res.status(200).json({
    message: "Course retrieved successfully.",
  });
};

const createCourse = (req, res) => {
  res.status(201).json({
    message: "Course created successfully.",
  });
};

const updateCourse = (req, res) => {
  res.status(200).json({
    message: "Course updated successfully.",
  });
};

const deleteCourse = (req, res) => {
  res.status(200).json({
    message: "Course deleted successfully.",
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
