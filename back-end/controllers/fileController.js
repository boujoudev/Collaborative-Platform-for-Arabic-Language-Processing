const { ProjectFile, CorpusFile, CourseFile, AnnotationFile, Project, Corpus, Course, Publication } = require('../models');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Upload d'un fichier
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été uploadé' });
        }

        const { entityType, entityId } = req.params;
        const { originalname, filename, path: filePath, mimetype, size } = req.file;

        console.log('Upload du fichier:', {
            originalname,
            filename,
            filePath,
            entityType,
            entityId
        });

        // Configuration dynamique des entités et fichiers
        const entityMap = {
            project: { model: Project, fileModel: ProjectFile, foreignKey: 'project_id', folder: 'project' },
            corpus: { model: Corpus, fileModel: CorpusFile, foreignKey: 'corpus_id', folder: 'corpus' },
            course: { model: Course, fileModel: CourseFile, foreignKey: 'course_id', folder: 'course' },
            publication: { model: Publication, fileModel: Publication, foreignKey: 'publication_id' },
            annotation: { model: Corpus, fileModel: AnnotationFile, foreignKey: 'corpus_id', folder: 'annotation' }
        };

        const config = entityMap[entityType];

        if (!config) {
            return res.status(400).json({ message: 'Type d\'entité non valide' });
        }

        const entity = await config.model.findByPk(entityId);
        if (!entity) {
            return res.status(404).json({ message: `${entityType} non trouvé` });
        }

        // --- Gestion spécifique pour les publications ---
        let uploadFolder = null;

        if (entityType === 'publication') {
            // Utiliser publication_type pour définir le dossier
            const pubType = entity.publication_type ? entity.publication_type.toLowerCase().trim() : 'unknown';

            uploadFolder = path.join(__dirname, '..', 'uploads', pubType);

            // Créer le dossier s'il n'existe pas
            if (!fs.existsSync(uploadFolder)) {
                fs.mkdirSync(uploadFolder, { recursive: true });
            }

            // Déplacer le fichier uploadé vers le dossier correct
            const finalPath = path.join(uploadFolder, filename);
            fs.renameSync(filePath, finalPath);

            // Enregistrer le chemin relatif dans la base (pour publication, on utilise file_path = filename seulement)
            // Si tu veux stocker le chemin complet relatif au dossier uploads, fais : `${pubType}/${filename}`
            await config.fileModel.update(
                { file_path: `${pubType}/${filename}` },
                { where: { id: entityId } }
            );

            // Enregistrer dans une table de fichiers séparée si tu en as une, sinon ok comme ça
            // Si Publication est aussi la table des fichiers, alors c'est bon ici

            res.status(201).json({
                message: 'Fichier uploadé avec succès dans le dossier publication',
                file_name: filename,
                file_path: `${pubType}/${filename}`
            });
            return;
        }

        // --- Gestion pour les autres entités ---
        uploadFolder = path.join(__dirname, '..', 'uploads', config.folder);

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        // Déplacer le fichier uploadé vers le dossier correct
        const finalPath = path.join(uploadFolder, filename);
        fs.renameSync(filePath, finalPath);

        // Créer l'entrée dans la table des fichiers
        const file = await config.fileModel.create({
            file_name: filename,
            file_path: path.join(config.folder, filename), // chemin relatif dans uploads
            [config.foreignKey]: entityId,
            user_id: req.user.id
        });

        console.log('Fichier créé dans la base de données:', file.toJSON());

        res.status(201).json({
            message: 'Fichier uploadé avec succès',
            file: file
        });

    } catch (error) {
        console.error('Erreur lors de l\'upload du fichier:', error);
        res.status(500).json({ message: error.message });
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
