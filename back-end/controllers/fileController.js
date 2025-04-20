const { ProjectFile, CorpusFile, CourseFile, AnnotationFile, Project, Corpus, Course } = require('../models');
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

        // Vérifier l'existence de l'entité
        let entity;
        switch (entityType) {
            case 'project':
                entity = await Project.findByPk(entityId);
                if (!entity) {
                    return res.status(404).json({ message: 'Projet non trouvé' });
                }
                break;
            case 'corpus':
                entity = await Corpus.findByPk(entityId);
                if (!entity) {
                    return res.status(404).json({ message: 'Corpus non trouvé' });
                }
                break;
            case 'course':
                entity = await Course.findByPk(entityId);
                if (!entity) {
                    return res.status(404).json({ message: 'Cours non trouvé' });
                }
                break;
            default:
                return res.status(400).json({ message: 'Type d\'entité non valide' });
        }

        let fileModel;
        let foreignKey;

        switch (entityType) {
            case 'project':
                fileModel = ProjectFile;
                foreignKey = 'project_id';
                break;
            case 'corpus':
                fileModel = CorpusFile;
                foreignKey = 'corpus_id';
                break;
            case 'course':
                fileModel = CourseFile;
                foreignKey = 'course_id';
                break;
            case 'annotation':
                fileModel = AnnotationFile;
                foreignKey = 'corpus_id';
                break;
            default:
                return res.status(400).json({ message: 'Type d\'entité non valide' });
        }

        const file = await fileModel.create({
            file_name: filename,
            file_path: filePath,
            [foreignKey]: entityId,
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

        console.log('Téléchargement du fichier...');
        res.download(filePath);
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
        res.status(500).json({ message: error.message });
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