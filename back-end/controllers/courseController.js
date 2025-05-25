const { Course, User } = require('../models');

const courseController = {
  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get courses by domain
  getCoursesByDomain: async (req, res) => {
    try {
      const { domain } = req.params;
      
      const courses = await Course.findAll({
        where: { domain },
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses by domain:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific course by ID
 getCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const course = await Course.findByPk(id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      return res.status(200).json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Create a new course
  createCourse: async (req, res) => {
    try {
      const { title, description, link, domain } = req.body;
      const user_id = req.user.id;
      
      // Validate required fields
      if (!title) {
        return res.status(400).json({ message: 'Course title is required' });
      }

      const newCourse = await Course.create({
        title,
        description,
        link,
        domain,
        user_id
      });

      const course = await Course.findByPk(newCourse.id, {
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ]
      });

      return res.status(201).json(course);
    } catch (error) {
      console.error('Error creating course:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing course
  updateCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, link, domain } = req.body;
      const user_id = req.user.id;

      // Find the course
      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if the user is the creator of the course
      if (course.user_id !== user_id) {
        return res.status(403).json({ message: 'Not authorized to update this course' });
      }

      // Update the course
      await course.update({
        title: title || course.title,
        description: description !== undefined ? description : course.description,
        link: link !== undefined ? link : course.link,
        domain: domain !== undefined ? domain : course.domain
      });

      // Fetch the updated course with creator details
      const updatedCourse = await Course.findByPk(id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the course
      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if the user is the creator of the course
      if (course.user_id !== user_id) {
        return res.status(403).json({ message: 'Not authorized to delete this course' });
      }

      // Delete the course
      await course.destroy();

      return res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = courseController;