const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Middleware for authentication
const { authenticate } = require('../middlewares/authMiddleware');

// Get all courses
// GET /api/courses
router.get('/', courseController.getAllCourses);

// Get courses by category
// GET /api/courses/category/:categoryId
router.get('/category/:categoryId', courseController.getCoursesByCategory);

// Get a specific course by ID
// GET /api/courses/:id
router.get('/:id', courseController.getCourseById);

// Create a new course (requires authentication)
// POST /api/courses
router.post('/', authenticate, courseController.createCourse);

// Update an existing course (requires authentication)
// PUT /api/courses/:id
router.put('/:id', authenticate, courseController.updateCourse);

// Delete a course (requires authentication)
// DELETE /api/courses/:id
router.delete('/:id', authenticate, courseController.deleteCourse);

module.exports = router;