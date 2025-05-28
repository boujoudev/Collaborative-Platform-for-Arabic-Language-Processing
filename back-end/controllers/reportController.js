const { Report } = require('../models');

// Helper: check if user is authenticated (basic check)
function isUser(req) {
  return !!req.user;
}

exports.createReport = async (req, res) => {
  try {
    // Only authenticated users can report
    if (!isUser(req)) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const { reported_type, reported_id, reason } = req.body;
    const userId = req.user.id;

    if (!reported_type || !reported_id || !reason) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const report = await Report.create({
      userId,
      reported_type,
      reported_id,
      reason
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create report', error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    // Only admin can get all reports
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    // Only admin can update report status
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    const { id } = req.params;
    const { status } = req.body;
    const report = await Report.findByPk(id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = status;
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update report', error: err.message });
  }
};