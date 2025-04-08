const CourseCategory = require('../models/CourseCategory');

class CourseCategoryController {
    // Get all course categories
    static async getAllCategories(req, res) {
        try {
            const categories = await CourseCategory.getAllCategories();
            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching categories: ${error.message}`
            });
        }
    }

    // Get a single category by ID
    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await CourseCategory.findById(id);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching category: ${error.message}`
            });
        }
    }

    // Create a new category
    static async createCategory(req, res) {
        try {
            const categoryData = req.body;
            if (!categoryData.name) {
                return res.status(400).json({
                    success: false,
                    message: 'Category name is required'
                });
            }
            const newCategory = await CourseCategory.create(categoryData);
            res.status(201).json({
                success: true,
                data: newCategory
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating category: ${error.message}`
            });
        }
    }

    // Update a category
    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const categoryData = req.body;
            const updatedCategory = await CourseCategory.update(id, categoryData);
            if (!updatedCategory) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedCategory
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating category: ${error.message}`
            });
        }
    }

    // Delete a category
    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await CourseCategory.delete(id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Category deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error deleting category: ${error.message}`
            });
        }
    }
}

module.exports = CourseCategoryController;