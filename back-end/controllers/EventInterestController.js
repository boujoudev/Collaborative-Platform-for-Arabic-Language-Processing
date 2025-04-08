const EventInterest = require('../models/EventInterest');

class EventInterestController {
    // Get all interests for an event
    static async getEventInterests(req, res) {
        try {
            const { eventId } = req.params;
            const interests = await EventInterest.findByEventId(eventId);
            if (!interests || interests.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No interests found for this event'
                });
            }
            res.status(200).json({
                success: true,
                data: interests
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching event interests: ${error.message}`
            });
        }
    }

    // Get all events a user is interested in
    static async getUserInterests(req, res) {
        try {
            const { userId } = req.params;
            const interests = await EventInterest.findByUserId(userId);
            if (!interests || interests.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No interests found for this user'
                });
            }
            res.status(200).json({
                success: true,
                data: interests
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching user interests: ${error.message}`
            });
        }
    }

    // Check if a user is interested in an event
    static async checkInterest(req, res) {
        try {
            const { eventId } = req.params;
            const userId = req.user.id; // Assuming user authentication is implemented
            const interest = await EventInterest.findOne({ eventId, userId });
            res.status(200).json({
                success: true,
                data: { interested: !!interest }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Express interest in an event
    static async expressInterest(req, res) {
        try {
            const { eventId } = req.params;
            const userId = req.user.id; // Assuming user authentication is implemented
            
            // Check if interest already exists
            const existingInterest = await EventInterest.findOne({ eventId, userId });
            if (existingInterest) {
                return res.status(400).json({
                    success: false,
                    message: 'User already interested in this event'
                });
            }

            const interestData = {
                eventId,
                userId,
                interestedAt: new Date()
            };

            const newInterest = await EventInterest.create(interestData);
            res.status(201).json({
                success: true,
                data: newInterest
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error expressing interest: ${error.message}`
            });
        }
    }

    // Remove interest from an event
    static async removeInterest(req, res) {
        try {
            const { eventId } = req.params;
            const userId = req.user.id; // Assuming user authentication is implemented
            
            const result = await EventInterest.delete({ eventId, userId });
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Interest not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Interest removed successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error removing interest: ${error.message}`
            });
        }
    }

    // Get interest count for an event
    static async getInterestCount(req, res) {
        try {
            const { eventId } = req.params;
            const count = await EventInterest.countByEventId(eventId);
            res.status(200).json({
                success: true,
                data: { count }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error getting interest count: ${error.message}`
            });
        }
    }
}

module.exports = EventInterestController;