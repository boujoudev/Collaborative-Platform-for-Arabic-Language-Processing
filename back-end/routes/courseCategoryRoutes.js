const express = require('express');
const router = express.Router();
const CourseCategoryController = require('../controllers/CourseCategoryController');

// Get all categories
router.get('/', CourseCategoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', CourseCategoryController.getCategoryById);

// Create a new category
router.post('/', CourseCategoryController.createCategory);

// Update a category
router.put('/:id', CourseCategoryController.updateCategory);

// Delete a category
router.delete('/:id', CourseCategoryController.deleteCategory);

module.exports = router;