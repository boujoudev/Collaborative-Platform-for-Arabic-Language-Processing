const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate } = require('../middlewares/authMiddleware');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get courses by domain
router.get('/domain/:domain', courseController.getCoursesByDomain);

// GET files bby course id 
router.get('/course/:courseId/files', courseController.getFilesByCourse);

// Get a specific course by ID
router.get('/:id', courseController.getCourseById);

// Create a new course (requires authentication)
router.post('/', authenticate, courseController.createCourse);

// Update an existing course (requires authentication)
router.put('/:id', authenticate, courseController.updateCourse);

// Delete a course (requires authentication)
router.delete('/:id', authenticate, courseController.deleteCourse);




module.exports = router;