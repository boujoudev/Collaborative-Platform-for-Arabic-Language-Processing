const { Forum, Post, Project, Course, Publication, Corpus, User } = require('../models');
const { Op } = require('sequelize');

const searchController = {
    search: async (req, res) => {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ error: 'Le paramètre de recherche est requis' });
            }

            // Recherche dans les forums
            const forums = await Forum.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${q}%` } },
                        { description: { [Op.iLike]: `%${q}%` } }
                    ]
                }
            });

            // Recherche dans les posts
            const posts = await Post.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${q}%` } },
                        { content: { [Op.iLike]: `%${q}%` } }
                    ]
                }
            });

            // Recherche dans les projets
            const projects = await Project.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${q}%` } },
                        { description: { [Op.iLike]: `%${q}%` } }
                    ]
                }
            });

            // Recherche dans les cours
            const courses = await Course.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${q}%` } },
                        { description: { [Op.iLike]: `%${q}%` } }
                    ]
                }
            });

            // Recherche dans les publications
            const publications = await Publication.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${q}%` } },
                        { description: { [Op.iLike]: `%${q}%` } }
                    ]
                }
            });

            // Recherche dans les corpus
            const corpora = await Corpus.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${q}%` } },
                        { description: { [Op.iLike]: `%${q}%` } }
                    ]
                }
            });

            // Recherche dans les utilisateurs
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { full_name: { [Op.iLike]: `%${q}%` } },
                        { username: { [Op.iLike]: `%${q}%` } },
                        { email: { [Op.iLike]: `%${q}%` } }
                    ]
                },
                attributes: ['id', 'full_name', 'username', 'email', 'role', 'certified', 'created_at']
            });

            res.json({
                forums,
                posts,
                projects,
                courses,
                publications,
                corpora,
                users
            });
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            res.status(500).json({ error: 'Erreur lors de la recherche' });
        }
    }
};

module.exports = searchController; 