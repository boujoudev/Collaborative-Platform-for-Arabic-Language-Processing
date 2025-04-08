const AnnotationFile = require('../models/AnnotationFile');

class AnnotationFileController {
    // Get all annotation files
    static async getAllAnnotationFiles(req, res) {
        try {
            const annotationFiles = await AnnotationFile.getAllAnnotationFiles();
            res.status(200).json({
                success: true,
                data: annotationFiles
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching annotation files: ${error.message}`
            });
        }
    }

    // Get a single annotation file by ID
    static async getAnnotationFileById(req, res) {
        try {
            const annotationFile = await AnnotationFile.getAnnotationFileById(req.params.id);
            if (!annotationFile) {
                return res.status(404).json({
                    success: false,
                    message: 'Annotation file not found'
                });
            }
            res.status(200).json({
                success: true,
                data: annotationFile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching annotation file: ${error.message}`
            });
        }
    }

    // Create a new annotation file
    static async createAnnotationFile(req, res) {
        try {
            const annotationFile = await AnnotationFile.createAnnotationFile(req.body);
            res.status(201).json({
                success: true,
                data: annotationFile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating annotation file: ${error.message}`
            });
        }
    }

    // Update an annotation file
    static async updateAnnotationFile(req, res) {
        try {
            const annotationFile = await AnnotationFile.updateAnnotationFile(req.params.id, req.body);
            if (!annotationFile) {
                return res.status(404).json({
                    success: false,
                    message: 'Annotation file not found'
                });
            }
            res.status(200).json({
                success: true,
                data: annotationFile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating annotation file: ${error.message}`
            });
        }
    }

    // Delete an annotation file
    static async deleteAnnotationFile(req, res) {
        try {
            const result = await AnnotationFile.deleteAnnotationFile(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Annotation file not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Annotation file deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error deleting annotation file: ${error.message}`
            });
        }
    }
}

module.exports = AnnotationFileController;