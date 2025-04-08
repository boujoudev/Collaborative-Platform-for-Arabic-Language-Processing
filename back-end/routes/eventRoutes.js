const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController.js');

// Get all events
router.get('/', EventController.getAllEvents);

// Get event by ID
router.get('/:id', EventController.getEventById);

// Create new event
router.post('/', EventController.createEvent);

// Update event
router.put('/:id', EventController.updateEvent);

// Delete event
router.delete('/:id', EventController.deleteEvent);

module.exports = router;