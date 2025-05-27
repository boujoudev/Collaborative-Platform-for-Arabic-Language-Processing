const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.post('/create', skillController.createSkill);
router.get('/', skillController.getAllSkills);
router.get('/users/:userId', skillController.getSkillsByUserId); // Spécifique -> doit être avant /:id
router.get('/:id', skillController.getSkillById);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
