const express = require('express');
const router = express.Router();
const EventInterestController = require('../controllers/EventInterestController');

// Get interests for a specific event
router.get('/event/:eventId', EventInterestController.getEventInterests);

// Get all events a user is interested in
router.get('/user/:userId', EventInterestController.getUserInterests);

// Express interest in an event
router.post('/', EventInterestController.createEventInterest);

// Remove interest in an event
router.delete('/:id', EventInterestController.deleteEventInterest);

module.exports = router;