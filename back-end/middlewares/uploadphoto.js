const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadProfilePath = path.join(__dirname, '../uploads/photos_de_profil');

if (!fs.existsSync(uploadProfilePath)) {
    fs.mkdirSync(uploadProfilePath, { recursive: true });
}

const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadProfilePath),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilterImagesOnly = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé pour la photo de profil'));
    }
};

const uploadProfilePhoto = multer({
    storage: storageProfile,
    fileFilter: fileFilterImagesOnly,
    limits: { fileSize: 5 * 1024 * 1024 } // limite 5 Mo
});

module.exports = uploadProfilePhoto;
