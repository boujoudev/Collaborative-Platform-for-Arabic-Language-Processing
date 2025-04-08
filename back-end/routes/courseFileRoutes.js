const express = require('express');
const router = express.Router();
const CourseFileController = require('../controllers/CourseFileController');

// Get all course files
router.get('/', CourseFileController.getAllCourseFiles);

// Get a single course file by ID
router.get('/:id', CourseFileController.getCourseFileById);

// Create a new course file
router.post('/', CourseFileController.createCourseFile);

// Update a course file
router.put('/:id', CourseFileController.updateCourseFile);

// Delete a course file
router.delete('/:id', CourseFileController.deleteCourseFile);

module.exports = router;