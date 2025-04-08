const User = require('../models/User');

class UserController {
    // Get all users
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching users: ${error.message}`
            });
        }
    }

    // Get a single user by ID
    static async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error fetching user: ${error.message}`
            });
        }
    }

    // Create a new user
    static async createUser(req, res) {
        try {
            const userData = req.body;
            // Add validation for required fields
            if (!userData.email || !userData.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const newUser = await User.create(userData);
            res.status(201).json({
                success: true,
                data: newUser
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error creating user: ${error.message}`
            });
        }
    }

    // Update a user
    static async updateUser(req, res) {
        try {
            const updatedUser = await User.update(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedUser
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error updating user: ${error.message}`
            });
        }
    }

    // Delete a user
    static async deleteUser(req, res) {
        try {
            const result = await User.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error deleting user: ${error.message}`
            });
        }
    }

    // User authentication
    static async authenticateUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Add password verification logic here
            const isValid = await User.verifyPassword(password, user.password);
            if (!isValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Authentication failed: ${error.message}`
            });
        }
    }
}

module.exports = UserController;