const { ProjectFile, CorpusFile, CourseFile, AnnotationFile, Project, Corpus, Course, Publication } = require('../models');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Upload d'un fichier
exports.uploadFile = async (req, res) => {
    try {
        // Vérification du fichier
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été uploadé' });
        }

        const { entityType, entityId } = req.params;
        const { originalname, filename, path: filePath, mimetype, size } = req.file;

        // Configuration des entités
        const entityMap = {
            project: { 
                model: Project, 
                fileModel: ProjectFile, 
                foreignKey: 'project_id', 
                folder: 'projects',
                allowedTypes: ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            },
            course: { 
                model: Course, 
                fileModel: CourseFile, 
                foreignKey: 'course_id', 
                folder: 'courses',
                allowedTypes: ['video/mp4', 'video/webm', 'application/pdf']
            },
            corpus: { 
                model: Corpus, 
                fileModel: CorpusFile, 
                foreignKey: 'corpus_id', 
                folder: 'corpus',
                allowedTypes: ['text/plain', 'application/json', 'text/csv']
            }
        };

        // Vérification de l'entité
        const config = entityMap[entityType];
        if (!config) {
            return res.status(400).json({ message: 'Type d\'entité non valide' });
        }

        // Vérification du type de fichier
        if (!config.allowedTypes.includes(mimetype)) {
            return res.status(400).json({ 
                message: `Type de fichier non autorisé pour ${entityType}. Types autorisés: ${config.allowedTypes.join(', ')}` 
            });
        }

        // Vérification de l'existence de l'entité
        const entity = await config.model.findByPk(entityId);
        if (!entity) {
            return res.status(404).json({ message: `${entityType} non trouvé` });
        }

        // Gestion du dossier d'upload
        const uploadFolder = path.join(__dirname, '..', 'uploads', config.folder);
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        // Création du nom de fichier unique
        const fileExtension = path.extname(originalname);
        const uniqueFilename = `${entityType}_${entityId}_${Date.now()}${fileExtension}`;
        const finalPath = path.join(uploadFolder, uniqueFilename);

        // Déplacement du fichier
        fs.renameSync(filePath, finalPath);

        // Création de l'entrée dans la base de données
        const file = await config.fileModel.create({
            file_name: uniqueFilename,
            original_name: originalname,
            file_path: path.join(config.folder, uniqueFilename),
            mime_type: mimetype,
            size: size,
            [config.foreignKey]: entityId,
            user_id: req.user.id
        });

        // Réponse
        return res.status(201).json({
            success: true,
            message: 'Fichier uploadé avec succès',
            file: {
                id: file.id,
                name: file.file_name,
                originalName: file.original_name,
                path: file.file_path,
                type: file.mime_type,
                size: file.size
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'upload du fichier:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Erreur lors de l\'upload du fichier',
            error: error.message 
        });
    }
};

// Téléchargement d'un fichier
exports.downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    console.log('Tentative de téléchargement du fichier:', filename);

    const sources = [
      { model: ProjectFile, field: 'file_name', folder: 'project' },
      { model: CorpusFile, field: 'file_name', folder: 'corpus' },
      { model: CourseFile, field: 'file_name', folder: 'course' },
      { model: AnnotationFile, field: 'file_name', folder: 'annotation' }
    ];

    let filePath = null;

    // Chercher dans les fichiers classiques
    for (const source of sources) {
      const file = await source.model.findOne({ where: { [source.field]: filename } });
      if (file) {
        filePath = path.join(__dirname, '..', 'uploads', source.folder, filename);
        break;
      }
    }

    // Cas particulier : fichiers de publication
    if (!filePath) {
      const publication = await Publication.findOne({ where: { file_path: { [Op.like]: `%${filename}` } } });
      console.log('Publication trouvée dans la base:', publication ? publication.toJSON() : null);

      if (publication) {
        const publicationType = publication.publication_type.toLowerCase();
        console.log('Type publication:', publicationType);

        filePath = path.join(__dirname, '..', 'uploads', publicationType, filename);
        console.log('Chemin construit:', filePath);
      }
    }

    // Vérification et envoi du fichier
    if (!filePath || !fs.existsSync(filePath)) {
      console.log('Fichier non trouvé, path:', filePath);
      return res.status(404).json({ message: 'Fichier non trouvé sur le serveur ou dans la base de données' });
    }

    res.download(filePath);
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Suppression d'un fichier
exports.deleteFile = async (req, res) => {
    try {
        const { filename } = req.params;
        console.log('Tentative de suppression du fichier:', filename);
        
        // Chercher le fichier dans la base de données pour obtenir son type d'entité
        let file = await ProjectFile.findOne({ where: { file_name: filename } });
        let entityType = 'project';
        
        if (!file) {
            console.log('Fichier non trouvé dans project_files, recherche dans corpus_files...');
            file = await CorpusFile.findOne({ where: { file_name: filename } });
            entityType = 'corpus';
        }
        
        if (!file) {
            console.log('Fichier non trouvé dans corpus_files, recherche dans course_files...');
            file = await CourseFile.findOne({ where: { file_name: filename } });
            entityType = 'course';
        }
        
        if (!file) {
            console.log('Fichier non trouvé dans course_files, recherche dans annotation_files...');
            file = await AnnotationFile.findOne({ where: { file_name: filename } });
            entityType = 'annotation';
        }
        
        // Cas particulier : publication (avec dossier dynamique)
        if (!file) {
            file = await Publication.findOne({ where: { file_path: { [Op.like]: `%${filename}` } } });
            if (file) {
                entityType = file.publication_type.toLowerCase();
            }
        }
        
        if (!file) {
            console.log('Fichier non trouvé dans aucune table');
            return res.status(404).json({ message: 'Fichier non trouvé dans la base de données' });
        }

        console.log('Fichier trouvé dans la base de données:', file.toJSON());

        const filePath = path.join(__dirname, '..', 'uploads', entityType, filename);
        console.log('Chemin du fichier:', filePath);

        if (!fs.existsSync(filePath)) {
            console.log('Fichier non trouvé sur le serveur');
            return res.status(404).json({ message: 'Fichier non trouvé sur le serveur' });
        }

        // Supprimer le fichier du système de fichiers
        fs.unlinkSync(filePath);
        console.log('Fichier supprimé du système de fichiers');

        // Supprimer l'entrée de la base de données
        await file.destroy();
        console.log('Entrée supprimée de la base de données');

        res.json({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du fichier:', error);
        res.status(500).json({ message: error.message });
    }
};
