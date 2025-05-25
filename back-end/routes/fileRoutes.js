const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const courseUpload = require('../middlewares/courseUpload');
const fileController = require('../controllers/fileController');
const { authenticate } = require('../middlewares/authMiddleware');

// Upload spécifique pour les cours

router.post('/upload/courses/:entityId', 
    authenticate,
    (req, res, next) => {
        req.params.entityType = 'course'; // injection manuelle
        next();
    },
    courseUpload, 
    fileController.uploadFile
);

// Upload pour les autres types d'entités
router.post('/upload/:entityType/:entityId', 
    authenticate,
    (req, res, next) => {
        if (req.params.entityType === 'courses') {
            return res.status(400).json({ 
                message: 'Utilisez /upload/courses/:entityId pour les cours' 
            });
        }
        next();
    },
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