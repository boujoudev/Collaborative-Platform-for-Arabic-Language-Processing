const ProjectFile = require('../models/ProjectFile');

class ProjectFileController {
    // Get all project files
    static async getAllProjectFiles(req, res) {
        try {
            const projectFiles = await ProjectFile.getAllProjectFiles();
            res.status(200).json(projectFiles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a single project file by ID
    static async getProjectFileById(req, res) {
        try {
            const projectFile = await ProjectFile.getProjectFileById(req.params.id);
            if (!projectFile) {
                return res.status(404).json({ message: 'Project file not found' });
            }
            res.status(200).json(projectFile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create a new project file
    static async createProjectFile(req, res) {
        try {
            const projectFile = await ProjectFile.createProjectFile(req.body);
            res.status(201).json(projectFile);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update a project file
    static async updateProjectFile(req, res) {
        try {
            const projectFile = await ProjectFile.updateProjectFile(req.params.id, req.body);
            if (!projectFile) {
                return res.status(404).json({ message: 'Project file not found' });
            }
            res.status(200).json(projectFile);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a project file
    static async deleteProjectFile(req, res) {
        try {
            const result = await ProjectFile.deleteProjectFile(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Project file not found' });
            }
            res.status(200).json({ message: 'Project file deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectFileController;