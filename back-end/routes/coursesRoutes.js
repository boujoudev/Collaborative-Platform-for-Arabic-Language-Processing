const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController.js");

// Get all courses
router.get("/", CourseController.getAllCourses);

// Get course by ID
router.get("/:id", CourseController.getCourseById);

// Create new course
router.post("/", CourseController.createCourse);

// Update course
router.put("/:id", CourseController.updateCourse);

// Delete course
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;