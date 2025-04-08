const Project = require('../models/Project');

class ProjectController {
    // Get all projects
    static async getAllProjects(req, res) {
        try {
            const projects = await Project.getAllProjects();
            res.status(200).json({
                success: true,
                data: projects
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a single project by ID
    static async getProjectById(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create a new project
    static async createProject(req, res) {
        try {
            const projectData = req.body;
            // Add validation for required fields
            if (!projectData.name || !projectData.description) {
                return res.status(400).json({ error: 'Project name and description are required' });
            }

            const newProject = await Project.create(projectData);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update a project
    static async updateProject(req, res) {
        try {
            const updatedProject = await Project.update(req.params.id, req.body);
            if (!updatedProject) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a project
    static async deleteProject(req, res) {
        try {
            const result = await Project.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get projects by user ID
    static async getProjectsByUser(req, res) {
        try {
            const projects = await Project.findByUserId(req.params.userId);
            res.status(200).json({
                success: true,
                data: projects
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add participant to project
    static async addParticipant(req, res) {
        try {
            const { projectId, userId } = req.body;
            const result = await Project.addParticipant(projectId, userId);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Remove participant from project
    static async removeParticipant(req, res) {
        try {
            const { projectId, userId } = req.params;
            const result = await Project.removeParticipant(projectId, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectController;