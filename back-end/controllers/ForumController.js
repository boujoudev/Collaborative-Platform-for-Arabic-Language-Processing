const Forum = require('../models/Forum');

class ForumController {
    // Get all forum topics
    static async getAllTopics(req, res) {
        try {
            const topics = await Forum.getAllTopics();
            if (!topics || topics.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No forum topics found'
                });
            }
            res.status(200).json({
                success: true,
                data: topics
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching forum topics: ${error.message}`
            });
        }
    }

    // Get topics by category
    static async getTopicsByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const topics = await Forum.findByCategory(categoryId);
            if (!topics || topics.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No topics found in this category'
                });
            }
            res.status(200).json({
                success: true,
                data: topics
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Get a single topic by ID
    static async getTopicById(req, res) {
        try {
            const { id } = req.params;
            const topic = await Forum.findById(id);
            if (!topic) {
                return res.status(404).json({
                    success: false,
                    message: 'Forum topic not found'
                });
            }
            res.status(200).json({
                success: true,
                data: topic
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Create a new forum topic
    static async createTopic(req, res) {
        try {
            if (!req.body.title || !req.body.content) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and content are required'
                });
            }

            const topicData = {
                ...req.body,
                createdBy: req.user.id,
                createdAt: new Date()
            };
            const newTopic = await Forum.create(topicData);
            res.status(201).json({
                success: true,
                data: newTopic
            });
        } catch (error) {
            res.status(400).json({ message: `Error creating forum topic: ${error.message}` });
        }
    }

    // Update a forum topic
    static async updateTopic(req, res) {
        try {
            const { id } = req.params;
            const topicData = req.body;
            
            // Check if user is authorized to update the topic
            const topic = await Forum.findById(id);
            if (!topic) {
                return res.status(404).json({
                    success: false,
                    message: 'Forum topic not found'
                });
            }
            if (topic.createdBy !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to update this topic'
                });
            }

            const updatedTopic = await Forum.update(id, topicData);
            res.status(200).json({
                success: true,
                data: updatedTopic
            });
        } catch (error) {
            res.status(400).json({ message: `Error updating forum topic: ${error.message}` });
        }
    }

    // Delete a forum topic
    static async deleteTopic(req, res) {
        try {
            const { id } = req.params;
            
            // Check if user is authorized to delete the topic
            const topic = await Forum.findById(id);
            if (!topic) {
                return res.status(404).json({
                    success: false,
                    message: 'Forum topic not found'
                });
            }
            if (topic.createdBy !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to delete this topic'
                });
            }

            const result = await Forum.delete(id);
            res.status(200).json({
                success: true,
                message: 'Forum topic deleted successfully'
            });
        } catch (error) {
            res.status(400).json({ message: `Error deleting forum topic: ${error.message}` });
        }
    }

    // Get forum categories
    static async getCategories(req, res) {
        try {
            const categories = await Forum.getCategories();
            if (!categories || categories.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No forum categories found'
                });
            }
            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({ message: `Error fetching forum categories: ${error.message}` });
        }
    }

    // Search forum topics
    static async searchTopics(req, res) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }
            const topics = await Forum.search(query);
            res.status(200).json({
                success: true,
                data: topics
            });
        } catch (error) {
            res.status(400).json({ message: `Error searching forum topics: ${error.message}` });
        }
    }
}

module.exports = ForumController;