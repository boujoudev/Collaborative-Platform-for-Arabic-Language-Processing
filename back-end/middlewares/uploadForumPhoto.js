const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadForumPath = path.join(__dirname, '../uploads/forum_photos');

if (!fs.existsSync(uploadForumPath)) {
    fs.mkdirSync(uploadForumPath, { recursive: true });
}

const storageForum = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadForumPath),
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
        cb(new Error('Type de fichier non autorisé pour la photo du forum'));
    }
};

const uploadForumPhoto = multer({
    storage: storageForum,
    fileFilter: fileFilterImagesOnly,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 Mo
});

module.exports = uploadForumPhoto;
