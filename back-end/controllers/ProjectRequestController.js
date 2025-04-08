const ProjectRequest = require('../models/ProjectRequest');

class ProjectRequestController {
    // Get all project requests
    static async getAllProjectRequests(req, res) {
        try {
            const projectRequests = await ProjectRequest.getAllProjectRequests();
            res.status(200).json(projectRequests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a single project request by ID
    static async getProjectRequestById(req, res) {
        try {
            const projectRequest = await ProjectRequest.getProjectRequestById(req.params.id);
            if (!projectRequest) {
                return res.status(404).json({ message: 'Project request not found' });
            }
            res.status(200).json(projectRequest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create a new project request
    static async createProjectRequest(req, res) {
        try {
            const projectRequest = await ProjectRequest.createProjectRequest(req.body);
            res.status(201).json(projectRequest);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update a project request
    static async updateProjectRequest(req, res) {
        try {
            const projectRequest = await ProjectRequest.updateProjectRequest(req.params.id, req.body);
            if (!projectRequest) {
                return res.status(404).json({ message: 'Project request not found' });
            }
            res.status(200).json(projectRequest);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a project request
    static async deleteProjectRequest(req, res) {
        try {
            const result = await ProjectRequest.deleteProjectRequest(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Project request not found' });
            }
            res.status(200).json({ message: 'Project request deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectRequestController;