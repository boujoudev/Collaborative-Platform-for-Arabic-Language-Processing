const express = require('express');
const router = express.Router();
const contactMeController = require('../controllers/contactMeController');

router.post('/create', contactMeController.createContact);
router.put('/update/:userId', contactMeController.updateContact);
router.get('/users/:userId', contactMeController.getContactByUserId);

module.exports = router;
