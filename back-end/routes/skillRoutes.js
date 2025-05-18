const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.post('/skills', skillController.createSkill);
router.get('/skills', skillController.getAllSkills);
router.get('/skills/:id', skillController.getSkillById);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);
router.get('/skills', skillController.getSkillsByUserId); 

module.exports = router;