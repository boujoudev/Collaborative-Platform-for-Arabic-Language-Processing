const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware for authentication
const { authenticate } = require('../middlewares/authMiddleware');

// Get all events
// GET /api/events
router.get('/', eventController.getAllEvents);

// Get upcoming events
// GET /api/events/upcoming
router.get('/upcoming', eventController.getUpcomingEvents);

// Get a specific event by ID
// GET /api/events/:id
router.get('/:id', eventController.getEventById);

// Create a new event (requires authentication)
// POST /api/events
router.post('/', authenticate, eventController.createEvent);

// Update an existing event (requires authentication)
// PUT /api/events/:id
router.put('/:id', authenticate, eventController.updateEvent);

// Delete an event (requires authentication)
// DELETE /api/events/:id
router.delete('/:id', authenticate, eventController.deleteEvent);

// Express interest in an event (requires authentication)
// POST /api/events/:id/interest
router.post('/:id/interest', authenticate, eventController.expressInterest);

// Withdraw interest from an event (requires authentication)
// DELETE /api/events/:id/interest
router.delete('/:id/interest', authenticate, eventController.withdrawInterest);

module.exports = router;