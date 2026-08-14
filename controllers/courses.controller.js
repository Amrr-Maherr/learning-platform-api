const { db } = require("../config/db");
const { ObjectId } = require("mongodb");
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

const getCourseById = async (req, res) => {
  const id = req.params.id;
  const course = await db.courses_collection.findOne({ _id: new ObjectId(id) });
  if (!course) {
    res.status(404).json({
      message: "field",
      data: {
        title: "course not found!",
      },
    });
  } else {
    res.status(200).json({
      message: "success",
      data: {
        course: course,
      },
    });
  }
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
