const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticate, isAdmin, isModeratorOrAdmin } = require('../middlewares/authMiddleware');
const uploadForumPhoto = require('../middlewares/uploadForumPhoto');

// Public routes
// Get all forums
// GET /api/forums
router.get('/', forumController.getAllForums);

// Get a specific forum by ID
// GET /api/forums/:id
router.get('/:id', forumController.getForumById);

// Get all posts in a forum
// GET /api/forums/:id/posts
router.get('/:id/posts', forumController.getForumPosts);

// Protected routes (require authentication)
// Create a new forum
// POST /api/forums
router.post(
  '/',
  authenticate,
  uploadForumPhoto.single('photo'), 
  forumController.createForum
);

// Vérifier si l'utilisateur a rejoint un forum
// GET /api/forums/:forumId/joined
router.get('/:forumId/joined', authenticate, forumController.hasUserJoinedForum);

// Vérifier le statut notifyMe
// GET /api/forums/:forumId/notify-status
router.get('/:forumId/notify-status', authenticate, forumController.isNotifyMeEnabled);

// Rejoindre un forum
router.post('/:forumId/join', authenticate, forumController.joinForum);

// Quitter un forum
router.delete('/:forumId/leave', authenticate, forumController.leaveForum);

// Routes pour activer/désactiver notifyMe
router.post('/:forumId/notify/enable', authenticate, forumController.enableNotifyMe);
router.post('/:forumId/notify/disable', authenticate, forumController.disableNotifyMe);


// Update an existing forum
// PUT /api/forums/:id
router.put('/:id', authenticate, forumController.updateForum);

// Delete a forum
// DELETE /api/forums/:id
router.delete('/:id', authenticate, forumController.deleteForum);

module.exports = router;