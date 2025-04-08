const NLPTool = require('../models/NLPTool');

class NLPToolController {
    // Get all NLP tools
    static async getAllNLPTools(req, res) {
        try {
            const nlpTools = await NLPTool.getAllNLPTools();
            res.status(200).json({
                success: true,
                data: nlpTools
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching NLP tools: ${error.message}`
            });
        }
    }

    // Get a single NLP tool by ID
    static async getNLPToolById(req, res) {
        try {
            const nlpTool = await NLPTool.getNLPToolById(req.params.id);
            if (!nlpTool) {
                return res.status(404).json({
                    success: false,
                    message: 'NLP tool not found'
                });
            }
            res.status(200).json({
                success: true,
                data: nlpTool
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching NLP tool: ${error.message}`
            });
        }
    }

    // Create a new NLP tool
    static async createNLPTool(req, res) {
        try {
            const nlpToolData = req.body;
            // Add validation for required fields
            if (!nlpToolData.name || !nlpToolData.description) {
                return res.status(400).json({
                    success: false,
                    message: 'Name and description are required'
                });
            }

            const newNLPTool = await NLPTool.createNLPTool(nlpToolData);
            res.status(201).json({
                success: true,
                data: newNLPTool
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating NLP tool: ${error.message}`
            });
        }
    }

    // Update an NLP tool
    static async updateNLPTool(req, res) {
        try {
            const updatedNLPTool = await NLPTool.updateNLPTool(req.params.id, req.body);
            if (!updatedNLPTool) {
                return res.status(404).json({
                    success: false,
                    message: 'NLP tool not found'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedNLPTool
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating NLP tool: ${error.message}`
            });
        }
    }

    // Delete an NLP tool
    static async deleteNLPTool(req, res) {
        try {
            const result = await NLPTool.deleteNLPTool(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'NLP tool not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'NLP tool deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error deleting NLP tool: ${error.message}`
            });
        }
    }
}

module.exports = NLPToolController;