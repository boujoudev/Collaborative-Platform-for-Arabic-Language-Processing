const CorpusFile = require('../models/CorpusFile');

class CorpusFileController {
    // Get all corpus files
    static async getAllFiles(req, res) {
        try {
            const files = await CorpusFile.getAllFiles();
            res.status(200).json({
                success: true,
                data: files
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching corpus files: ${error.message}`
            });
        }
    }

    // Get files by corpus ID
    static async getFilesByCorpusId(req, res) {
        try {
            const { corpusId } = req.params;
            const files = await CorpusFile.findByCorpusId(corpusId);
            if (!files || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No files found for this corpus'
                });
            }
            res.status(200).json({
                success: true,
                data: files
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching corpus files: ${error.message}`
            });
        }
    }

    // Get a single file by ID
    static async getFileById(req, res) {
        try {
            const { id } = req.params;
            const file = await CorpusFile.findById(id);
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus file not found'
                });
            }
            res.status(200).json({
                success: true,
                data: file
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching corpus files: ${error.message}`
            });
        }
    }

    // Upload a new corpus file
    static async uploadFile(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
            }

            const fileData = {
                corpusId: req.body.corpusId,
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                uploadedBy: req.user.id // Assuming user authentication is implemented
            };

            const newFile = await CorpusFile.create(fileData);
            res.status(201).json({
                success: true,
                data: newFile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error uploading file: ${error.message}`
            });
        }
    }

    // Update file metadata
    static async updateFile(req, res) {
        try {
            const { id } = req.params;
            const fileData = req.body;
            const updatedFile = await CorpusFile.update(id, fileData);
            if (!updatedFile) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus file not found'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedFile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating file: ${error.message}`
            });
        }
    }

    // Delete a corpus file
    static async deleteFile(req, res) {
        try {
            const { id } = req.params;
            const result = await CorpusFile.delete(id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus file not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Corpus file deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error deleting file: ${error.message}`
            });
        }
    }

    // Download a corpus file
    static async downloadFile(req, res) {
        try {
            const { id } = req.params;
            const file = await CorpusFile.findById(id);
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: 'Corpus file not found'
                });
            }
            res.download(file.filePath, file.fileName);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error downloading file: ${error.message}`
            });
        }
    }
}

module.exports = CorpusFileController;