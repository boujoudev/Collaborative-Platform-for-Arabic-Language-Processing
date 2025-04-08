const Corpus = require('../models/Corpus');

class CorpusController {
    // Get all corpuses
    static async getAllCorpuses(req, res) {
        try {
            const corpuses = await Corpus.getAllCorpuses();
            res.status(200).json({
                success: true,
                data: corpuses
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching corpuses: ' + error.message
            });
        }
    }

    // Get a single corpus by ID
    static async getCorpusById(req, res) {
        try {
            const corpus = await Corpus.getCorpusById(req.params.id);
            if (!corpus) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus not found'
                });
            }
            res.status(200).json({
                success: true,
                data: corpus
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching corpus: ' + error.message
            });
        }
    }

    // Create a new corpus
    static async createCorpus(req, res) {
        try {
            const newCorpus = await Corpus.createCorpus(req.body);
            res.status(201).json({
                success: true,
                data: newCorpus
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating corpus: ' + error.message
            });
        }
    }

    // Update a corpus
    static async updateCorpus(req, res) {
        try {
            const updatedCorpus = await Corpus.updateCorpus(req.params.id, req.body);
            if (!updatedCorpus) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus not found'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedCorpus
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating corpus: ' + error.message
            });
        }
    }

    // Delete a corpus
    static async deleteCorpus(req, res) {
        try {
            const result = await Corpus.deleteCorpus(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Corpus deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error deleting corpus: ' + error.message
            });
        }
    }
}

module.exports = CorpusController;