const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/auth/check', authenticate, (req, res) => {
  res.status(200).json({
    message: 'User is authenticated',
    user: req.user,
  });
});


module.exports = router;
