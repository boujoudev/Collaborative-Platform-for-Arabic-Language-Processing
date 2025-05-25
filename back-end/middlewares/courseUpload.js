const multer = require('multer');
const path = require('path');
const fs = require('fs');

const COURSE_MIME_TYPES = {
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi',
  'video/webm': 'webm',
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'courses');
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      console.log('Dossier de destination créé/vérifié:', uploadDir);
      cb(null, uploadDir);
    } catch (error) {
      console.error('Erreur création dossier:', error);
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    try {
      const sanitizedName = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const timestamp = Date.now();
      const extension = COURSE_MIME_TYPES[file.mimetype];
      
      if (!extension) {
        throw new Error(`Extension non trouvée pour le type MIME: ${file.mimetype}`);
      }

      const newFilename = `course_${timestamp}_${sanitizedName}.${extension}`;
      
      console.log('Génération nom fichier:', {
        original: file.originalname,
        sanitized: sanitizedName,
        final: newFilename,
        mimetype: file.mimetype,
        extension
      });
      
      cb(null, newFilename);
    } catch (error) {
      console.error('Erreur génération nom fichier:', error);
      cb(error);
    }
  }
});

const fileFilter = (req, file, cb) => {
  try {
    console.log('Vérification fichier:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    if (!file.originalname) {
      throw new Error('Nom de fichier manquant');
    }

    const isValid = COURSE_MIME_TYPES.hasOwnProperty(file.mimetype);
    if (!isValid) {
      throw new Error(`Type de fichier non autorisé. Types acceptés: ${Object.keys(COURSE_MIME_TYPES).join(', ')}`);
    }

    cb(null, true);
  } catch (error) {
    console.error('Erreur validation fichier:', error);
    cb(error);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
    files: 1
  }
}).single('file');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Erreur Multer:', {
        name: err.name,
        message: err.message,
        code: err.code,
        stack: err.stack
      });

      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'Le fichier est trop volumineux (max 500MB)'
          });
        }
        return res.status(400).json({
          success: false,
          message: `Erreur upload: ${err.message}`
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message || 'Erreur lors de l\'upload du fichier'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier n\'a été uploadé'
      });
    }

    console.log('Upload réussi:', {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    next();
  });
};