const { Event, User, EventInterest, Sequelize } = require('../models');
const { Op } = Sequelize;

// Controller for handling event-related operations
const eventController = {
  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['start_time', 'ASC']]
      });

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get upcoming events
  getUpcomingEvents: async (req, res) => {
    try {
      const currentDate = new Date();
      
      const events = await Event.findAll({
        where: {
          start_time: {
            [Op.gt]: currentDate
          }
        },
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['start_time', 'ASC']]
      });

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific event by ID
  getEventById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const event = await Event.findByPk(id, {
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: EventInterest,
            as: 'interests',
            include: [{
              model: User,
              attributes: ['id', 'username', 'full_name']
            }]
          }
        ]
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      return res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new event
  createEvent: async (req, res) => {
    try {
      const { title, description, start_time, deadline, visibility } = req.body;
      const owner_id = req.user.id; // Assuming user is authenticated and available in req.user
      
      // Validate required fields
      if (!title || !description || !start_time || !deadline) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newEvent = await Event.create({
        title,
        description,
        start_time,
        deadline,
        visibility: visibility || 'public',
        owner_id
      });

      // Fetch the created event with owner details
      const event = await Event.findByPk(newEvent.id, {
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing event
  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, start_time, deadline, visibility } = req.body;
      const owner_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the event
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if the user is the owner of the event
      if (event.owner_id !== owner_id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: You can only update your own events' });
      }

      // Update the event
      await event.update({
        title: title || event.title,
        description: description || event.description,
        start_time: start_time || event.start_time,
        deadline: deadline || event.deadline,
        visibility: visibility || event.visibility
      });

      // Fetch the updated event with owner details
      const updatedEvent = await Event.findByPk(id, {
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete an event
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const owner_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the event
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if the user is the owner of the event or an admin
      if (event.owner_id !== owner_id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own events' });
      }

      // Delete the event
      await event.destroy();

      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Express interest in an event
  expressInterest: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the event
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if user has already expressed interest
      const existingInterest = await EventInterest.findOne({
        where: {
          event_id: id,
          user_id
        }
      });

      if (existingInterest) {
        return res.status(400).json({ message: 'You have already expressed interest in this event' });
      }

      // Create new interest record
      await EventInterest.create({
        event_id: id,
        user_id
      });

      return res.status(200).json({ message: 'Interest expressed successfully' });
    } catch (error) {
      console.error('Error expressing interest:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Withdraw interest from an event
  withdrawInterest: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the interest record
      const interest = await EventInterest.findOne({
        where: {
          event_id: id,
          user_id
        }
      });

      if (!interest) {
        return res.status(404).json({ message: 'Interest record not found' });
      }

      // Delete the interest record
      await interest.destroy();

      return res.status(200).json({ message: 'Interest withdrawn successfully' });
    } catch (error) {
      console.error('Error withdrawing interest:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = eventController;