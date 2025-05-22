const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const entityType = req.params.entityType;
        const uploadPath = path.join(__dirname, '../uploads', entityType);
        
        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Générer un nom de fichier unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre pour vérifier le type de fichier
const fileFilter = (req, file, cb) => {
    // Liste des types MIME autorisés
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/csv',
        'application/json',
        'application/xml',
        'image/jpeg',
        'image/png',
        'image/gif',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé'), false);
    }
};

// Configuration de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limite de 10MB
    }
});

module.exports = upload; 