const { body, param } = require("express-validator");

const idValidator = [
  param("id").isMongoId().withMessage("Invalid course ID"),
];

const createCourseValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("instructor").notEmpty().withMessage("Instructor is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("students")
    .isInt({ min: 0 })
    .withMessage("Students must be a positive integer"),
];

module.exports = {
  createCourseValidator,
  idValidator,
};
