const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const fileController = require('../controllers/fileController');
const { authenticate } = require('../middlewares/authMiddleware');

// Upload d'un fichier pour une entité spécifique
router.post('/upload/:entityType/:entityId', 
    authenticate, 
    upload.single('file'), 
    fileController.uploadFile
);

// Téléchargement d'un fichier
router.get('/download/:filename', 
    authenticate, 
    fileController.downloadFile
);

// Suppression d'un fichier
router.delete('/delete/:filename', 
    authenticate, 
    fileController.deleteFile
);

module.exports = router; 