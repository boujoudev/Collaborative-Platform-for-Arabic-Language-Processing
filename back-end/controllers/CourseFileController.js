const CourseFile = require('../models/CourseFile');

class CourseFileController {
    // Get all course files
    static async getAllCourseFiles(req, res) {
        try {
            const courseFiles = await CourseFile.getAllCourseFiles();
            res.status(200).json({
                success: true,
                data: courseFiles
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching course files: ${error.message}`
            });
        }
    }

    // Get a single course file by ID
    static async getCourseFileById(req, res) {
        try {
            const courseFile = await CourseFile.getCourseFileById(req.params.id);
            if (!courseFile) {
                return res.status(404).json({
                    success: false,
                    message: 'Course file not found'
                });
            }
            res.status(200).json({
                success: true,
                data: courseFile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching course file: ${error.message}`
            });
        }
    }

    // Create a new course file
    static async createCourseFile(req, res) {
        try {
            const courseFile = await CourseFile.createCourseFile(req.body);
            res.status(201).json({
                success: true,
                data: courseFile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating course file: ${error.message}`
            });
        }
    }

    // Update a course file
    static async updateCourseFile(req, res) {
        try {
            const courseFile = await CourseFile.updateCourseFile(req.params.id, req.body);
            if (!courseFile) {
                return res.status(404).json({
                    success: false,
                    message: 'Course file not found'
                });
            }
            res.status(200).json({
                success: true,
                data: courseFile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating course file: ${error.message}`
            });
        }
    }

    // Delete a course file
    static async deleteCourseFile(req, res) {
        try {
            const result = await CourseFile.deleteCourseFile(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Course file not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Course file deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error deleting course file: ${error.message}`
            });
        }
    }
}

module.exports = CourseFileController;