const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier de destination pour les photos des posts
const uploadPostPath = path.join(__dirname, '../uploads/post_photos');

// Crée le dossier s’il n'existe pas
if (!fs.existsSync(uploadPostPath)) {
    fs.mkdirSync(uploadPostPath, { recursive: true });
}

// Configuration du stockage
const storagePost = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPostPath),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre pour autoriser uniquement les images
const fileFilterImagesOnly = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé pour la photo du post'));
    }
};

// Middleware multer
const uploadPostPhoto = multer({
    storage: storagePost,
    fileFilter: fileFilterImagesOnly,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5 Mo
});

module.exports = uploadPostPhoto;
