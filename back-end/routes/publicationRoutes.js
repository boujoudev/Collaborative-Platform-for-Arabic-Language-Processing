const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const {authenticate} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // Ton middleware multer

// GET all publications
router.get('/', publicationController.getAll);

// GET single publication
router.get('/:id', publicationController.getById);

// POST new publication with file upload
console.log('upload.single:', typeof upload.single);
router.post('/:entityType', authenticate, upload.single('file'), publicationController.create);

// PUT update publication with optional new file
router.put('/:id/:entityType', authenticate, upload.single('file'), publicationController.update);

// DELETE publication
router.delete('/:id', authenticate, publicationController.delete);

module.exports = router;
