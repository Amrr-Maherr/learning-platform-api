const { db } = require("../config/db");
const { ObjectId, save } = require("mongodb");
const getAllCourses = async (req, res) => {
  const { title } = req.query;
  const allCourses = await db.courses_collection
    .find({
      title,
    })
    .toArray();
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
        message: "course not found!",
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

const createCourse = async (req, res) => {
  const {
    title,
    instructor,
    category,
    price,
    rating,
    duration,
    level,
    students,
  } = req.body;
  const newCourse = {
    title,
    instructor,
    category,
    price,
    rating,
    duration,
    level,
    students,
  };
  await db.courses_collection.insertOne(newCourse);
  res.status(201).json({
    message: "success",
    data: {
      course: newCourse,
    },
  });
};

const updateCourse = async (req, res) => {
  const {
    title,
    instructor,
    category,
    price,
    rating,
    duration,
    level,
    students,
  } = req.body;

  const { id } = req.params;

  const course = await db.courses_collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        instructor,
        category,
        price,
        rating,
        duration,
        level,
        students,
      },
    },
  );

  res.status(200).json({
    message: "success",
    data: {
      course,
    },
  });
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  const course = await db.courses_collection.deleteOne({
    _id: new ObjectId(id),
  });
  console.log(course);

  if (course.deletedCount === 0) {
    res.status(404).json({
      message: "field",
      data: {
        message: "course not found!",
      },
    });
  } else {
    res.status(200).json({
      message: "success",
      data: null,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
