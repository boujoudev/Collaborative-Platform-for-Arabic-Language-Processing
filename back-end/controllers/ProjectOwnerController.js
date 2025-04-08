const ProjectOwner = require('../models/ProjectOwner.js');

class ProjectOwnerController {
    // Get all project owners
    static async getAllProjectOwners(req, res) {
        try {
            const projectOwners = await ProjectOwner.getAllProjectOwners();
            res.status(200).json(projectOwners);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get project owner by ID
    static async getProjectOwnerById(req, res) {
        try {
            const projectOwner = await ProjectOwner.getProjectOwnerById(req.params.id);
            if (!projectOwner) {
                return res.status(404).json({ message: 'Project owner not found' });
            }
            res.status(200).json(projectOwner);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create new project owner
    static async createProjectOwner(req, res) {
        try {
            const newProjectOwner = await ProjectOwner.createProjectOwner(req.body);
            res.status(201).json(newProjectOwner);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update project owner
    static async updateProjectOwner(req, res) {
        try {
            const updatedProjectOwner = await ProjectOwner.updateProjectOwner(req.params.id, req.body);
            if (!updatedProjectOwner) {
                return res.status(404).json({ message: 'Project owner not found' });
            }
            res.status(200).json(updatedProjectOwner);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete project owner
    static async deleteProjectOwner(req, res) {
        try {
            const result = await ProjectOwner.deleteProjectOwner(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Project owner not found' });
            }
            res.status(200).json({ message: 'Project owner deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectOwnerController;