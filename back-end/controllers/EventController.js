const Event = require('../models/Event.js');

class EventController {
    // Get all events
    static async getAllEvents(req, res) {
        try {
            const events = await Event.getAllEvents();
            res.status(200).json({
                success: true,
                data: events
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching events: ${error.message}`
            });
        }
    }

    // Get event by ID
    static async getEventById(req, res) {
        try {
            const event = await Event.getEventById(req.params.id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            res.status(200).json({
                success: true,
                data: event
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching event: ${error.message}`
            });
        }
    }

    // Create new event
    static async createEvent(req, res) {
        try {
            const newEvent = await Event.createEvent(req.body);
            res.status(201).json({
                success: true,
                data: newEvent
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating event: ${error.message}`
            });
        }
    }

    // Update event
    static async updateEvent(req, res) {
        try {
            const updatedEvent = await Event.updateEvent(req.params.id, req.body);
            if (!updatedEvent) {
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedEvent
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating event: ${error.message}`
            });
        }
    }

    // Delete event
    static async deleteEvent(req, res) {
        try {
            const result = await Event.deleteEvent(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Event deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error deleting event: ${error.message}`
            });
        }
    }
}

module.exports = EventController;