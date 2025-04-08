const ProjectParticipant = require('../models/ProjectParticipant');

class ProjectParticipantController {
    // Get all project participants
    static async getAllProjectParticipants(req, res) {
        try {
            const participants = await ProjectParticipant.getAllProjectParticipants();
            res.status(200).json(participants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get participants by project ID
    static async getParticipantsByProject(req, res) {
        try {
            const { projectId } = req.params;
            const participants = await ProjectParticipant.findByProjectId(projectId);
            res.status(200).json(participants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get projects by participant ID
    static async getProjectsByParticipant(req, res) {
        try {
            const { userId } = req.params;
            const projects = await ProjectParticipant.findByUserId(userId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add participant to project
    static async addParticipant(req, res) {
        try {
            const { projectId, userId, role = 'member' } = req.body;
            
            if (!projectId || !userId) {
                return res.status(400).json({ error: 'Project ID and User ID are required' });
            }

            const newParticipant = await ProjectParticipant.create({
                projectId,
                userId,
                role
            });
            res.status(201).json(newParticipant);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update participant role
    static async updateParticipantRole(req, res) {
        try {
            const { projectId, userId } = req.params;
            const { role: newRole } = req.body;

            if (!newRole) {
                return res.status(400).json({ error: 'New role is required' });
            }

            const updatedParticipant = await ProjectParticipant.update(projectId, userId, { role: newRole });
            if (!updatedParticipant) {
                return res.status(404).json({ error: 'Participant not found' });
            }
            res.status(200).json(updatedParticipant);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Remove participant from project
    static async removeParticipant(req, res) {
        try {
            const { projectId, userId } = req.params;
            const result = await ProjectParticipant.delete(projectId, userId);
            if (!result) {
                return res.status(404).json({ error: 'Participant not found' });
            }
            res.status(200).json({ message: 'Participant removed successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Check if user is participant in project
    static async isParticipant(req, res) {
        try {
            const { projectId, userId } = req.params;
            const participant = await ProjectParticipant.findOne(projectId, userId);
            res.status(200).json({ isParticipant: !!participant });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectParticipantController;