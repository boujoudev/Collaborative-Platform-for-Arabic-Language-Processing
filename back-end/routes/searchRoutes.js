const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authenticate } = require('../middlewares/authMiddleware');

// Route de recherche
// GET /api/search?q=...
router.get('/', authenticate, searchController.search);

module.exports = router; 