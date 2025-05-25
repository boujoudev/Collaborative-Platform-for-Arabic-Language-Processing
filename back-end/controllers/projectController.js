const { Project, User, ProjectOwner, ProjectParticipant, ProjectRequest, ProjectFile, Sequelize, sequelize } = require('../models');
const { Op } = Sequelize;

// Controller for handling project-related operations
const projectController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll({
        include: [{
          model: User,
          as: 'owners',
          attributes: ['id', 'username', 'full_name'],
          through: { attributes: [] }
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get projects by status
  getProjectsByStatus: async (req, res) => {
    try {
      const { status } = req.params;
      
      // Validate status
      if (!['finished', 'ongoing'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const projects = await Project.findAll({
        where: { status },
        include: [{
          model: User,
          as: 'owners',
          attributes: ['id', 'username', 'full_name'],
          through: { attributes: [] }
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects by status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific project by ID
  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const project = await Project.findByPk(id, {
        include: [
          {
            model: User,
            as: 'owners',
            attributes: ['id', 'username', 'full_name'],
            through: { attributes: [] }
          },
          {
            model: User,
            as: 'participants',
            attributes: ['id', 'username', 'full_name'],
            through: { attributes: [] }
          },
          {
            model: ProjectFile,
            as: 'files'
          }
        ]
      });

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new project
createProject: async (req, res) => {
  try {
    const { title, description, visibility, status, link } = req.body;
    const user_id = req.user.id;

    // Validation des champs requis
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Validation du lien si fourni
    if (link) {
      try {
        new URL(link);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid URL format for link' });
      }
    }

    // Création du projet dans une transaction
    const result = await sequelize.transaction(async (t) => {
      const newProject = await Project.create({
        title,
        description,
        visibility: visibility || 'public',
        status: status || 'ongoing',
        link: link || null
      }, { transaction: t });

      await ProjectOwner.create({
        project_id: newProject.id,
        user_id
      }, { transaction: t });

      return newProject;
    });

    // ✅ Réponse envoyée au client
    return res.status(201).json({ message: 'Project created successfully', project: result });

  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},


  // Update an existing project
updateProject: async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, visibility, status, link } = req.body;
    const user_id = req.user.id;

    // Trouver le projet
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Vérifier les autorisations
    const isOwner = await ProjectOwner.findOne({
      where: { project_id: id, user_id }
    });

    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only project owners can update projects' });
    }

    // Valider le lien si fourni
    if (link) {
      try {
        new URL(link);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid URL format for link' });
      }
    }

    // Mettre à jour le projet
    await project.update({
      title: title || project.title,
      description: description || project.description,
      visibility: visibility || project.visibility,
      status: status || project.status,
      link: link === undefined ? project.link : link
    });

    // ✅ Réponse envoyée
    return res.status(200).json({ message: 'Project updated successfully', project });

  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},


  // Delete a project
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the project
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if the user is an owner of the project
      const isOwner = await ProjectOwner.findOne({
        where: {
          project_id: id,
          user_id
        }
      });

      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only project owners can delete projects' });
      }

      // Delete the project
      await project.destroy();

      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Add a participant to a project
  addParticipant: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.body;
      const requester_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the project
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if the requester is an owner of the project
      const isOwner = await ProjectOwner.findOne({
        where: {
          project_id: id,
          user_id: requester_id
        }
      });

      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only project owners can add participants' });
      }

      // Check if user is already a participant
      const existingParticipant = await ProjectParticipant.findOne({
        where: {
          project_id: id,
          user_id
        }
      });

      if (existingParticipant) {
        return res.status(400).json({ message: 'User is already a participant in this project' });
      }

      // Add the user as a participant
      await ProjectParticipant.create({
        project_id: id,
        user_id
      });

      return res.status(200).json({ message: 'Participant added successfully' });
    } catch (error) {
      console.error('Error adding participant:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Remove a participant from a project
  removeParticipant: async (req, res) => {
    try {
      const { id, userId } = req.params;
      const requester_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the project
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if the requester is an owner of the project or the participant themselves
      const isOwner = await ProjectOwner.findOne({
        where: {
          project_id: id,
          user_id: requester_id
        }
      });

      if (!isOwner && requester_id !== parseInt(userId) && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only project owners or the participant themselves can remove participants' });
      }

      // Find the participant
      const participant = await ProjectParticipant.findOne({
        where: {
          project_id: id,
          user_id: userId
        }
      });

      if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
      }

      // Remove the participant
      await participant.destroy();

      return res.status(200).json({ message: 'Participant removed successfully' });
    } catch (error) {
      console.error('Error removing participant:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Request to join a project
  requestToJoin: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the project
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if user is already a participant
      const existingParticipant = await ProjectParticipant.findOne({
        where: {
          project_id: id,
          user_id
        }
      });

      if (existingParticipant) {
        return res.status(400).json({ message: 'You are already a participant in this project' });
      }

      // Check if user has already requested to join
      const existingRequest = await ProjectRequest.findOne({
        where: {
          project_id: id,
          user_id
        }
      });

      if (existingRequest) {
        return res.status(400).json({ message: 'You have already requested to join this project' });
      }

      // Create join request
      await ProjectRequest.create({
        project_id: id,
        user_id,
        status: 'pending'
      });

      return res.status(200).json({ message: 'Join request submitted successfully' });
    } catch (error) {
      console.error('Error requesting to join project:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle join request (approve/reject)
  handleJoinRequest: async (req, res) => {
    try {
      const { id, requestId } = req.params;
      const { status } = req.body; // 'approved' or 'rejected'
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Validate status
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be "approved" or "rejected"' });
      }

      // Find the project
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if the user is an owner of the project
      const isOwner = await ProjectOwner.findOne({
        where: {
          project_id: id,
          user_id
        }
      });

      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only project owners can handle join requests' });
      }

      // Find the request
      const request = await ProjectRequest.findOne({
        where: {
          id: requestId,
          project_id: id
        }
      });

      if (!request) {
        return res.status(404).json({ message: 'Join request not found' });
      }

      if (status === 'approved') {
        // Add the user as a participant
        await ProjectParticipant.create({
          project_id: id,
          user_id: request.user_id
        });
      }

      // Update request status
      await request.update({ status });

      return res.status(200).json({ message: `Join request ${status} successfully` });
    } catch (error) {
      console.error('Error handling join request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all join requests for a project
  getJoinRequests: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the project
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if the user is an owner of the project
      const isOwner = await ProjectOwner.findOne({
        where: {
          project_id: id,
          user_id
        }
      });

      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only project owners can view join requests' });
      }

      // Get all pending requests
      const requests = await ProjectRequest.findAll({
        where: {
          project_id: id,
          status: 'pending'
        },
        include: [{
          model: User,
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(requests);
    } catch (error) {
      console.error('Error fetching join requests:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = projectController;