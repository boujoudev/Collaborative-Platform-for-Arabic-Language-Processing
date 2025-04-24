const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin, isModeratorOrAdmin } = require('../middlewares/authMiddleware');

// Public routes
// Register a new user
// POST /api/users/register
router.post('/register', userController.register);

// POST /api/users/verify-email
router.post('/verify-email', userController.verifyEmail);

// Login user
// POST /api/users/login
router.post('/login', userController.login);

// Get user by ID (public profile)
// GET /api/users/:id
router.get('/:id', userController.getUserById);

// Protected routes (require authentication)
// Get current user profile
// GET /api/users/profile
router.get('/profile', authenticate, userController.getProfile);

// Update user profile
// PUT /api/users/profile
router.put('/profile', authenticate, userController.updateProfile);

// Change password
// PUT /api/users/change-password
router.put('/change-password', authenticate, userController.changePassword);

// Delete own account
// DELETE /api/users/:id
router.delete('/:id', authenticate, userController.deleteUser);

// Admin routes
// Get all users
// GET /api/users
router.get('/', authenticate, isAdmin, userController.getAllUsers);

// Update user role
// PUT /api/users/:id/role
router.put('/:id/role', authenticate, isAdmin, userController.updateUserRole);

// Toggle user certification
// PUT /api/users/:id/certification
router.put('/:id/certification', authenticate, isAdmin, userController.toggleCertification);

module.exports = router;