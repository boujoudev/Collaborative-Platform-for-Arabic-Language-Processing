const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// POST /api/reports - any authenticated user can create a report
router.post('/', authenticate, reportController.createReport);

// GET /api/reports - only admin can get all reports
router.get('/', authenticate, isAdmin, reportController.getAllReports);

// PATCH /api/reports/:id/status - only admin can update report status
router.patch('/:id/status', authenticate, isAdmin, reportController.updateReportStatus);

module.exports = router;