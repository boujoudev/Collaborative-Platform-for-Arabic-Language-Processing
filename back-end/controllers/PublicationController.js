const Publication = require('../models/Publication');

class PublicationController {
    // Get all publications
    static async getAllPublications(req, res) {
        try {
            const publications = await Publication.getAllPublications();
            res.status(200).json({
                success: true,
                data: publications
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching publications: ${error.message}`
            });
        }
    }

    // Get a single publication by ID
    static async getPublicationById(req, res) {
        try {
            const publication = await Publication.getPublicationById(req.params.id);
            if (!publication) {
                return res.status(404).json({
                    success: false,
                    message: 'Publication not found'
                });
            }
            res.status(200).json({
                success: true,
                data: publication
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching publication: ${error.message}`
            });
        }
    }

    // Create a new publication
    static async createPublication(req, res) {
        try {
            const publication = await Publication.createPublication(req.body);
            res.status(201).json({
                success: true,
                data: publication
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating publication: ${error.message}`
            });
        }
    }

    // Update a publication
    static async updatePublication(req, res) {
        try {
            const publication = await Publication.updatePublication(req.params.id, req.body);
            if (!publication) {
                return res.status(404).json({
                    success: false,
                    message: 'Publication not found'
                });
            }
            res.status(200).json({
                success: true,
                data: publication
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating publication: ${error.message}`
            });
        }
    }

    // Delete a publication
    static async deletePublication(req, res) {
        try {
            const result = await Publication.deletePublication(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Publication not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Publication deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error deleting publication: ${error.message}`
            });
        }
    }
}

module.exports = PublicationController;