const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = Sequelize;

// Secret key for JWT (should be in environment variables in production)
const JWT_SECRET = 'your_jwt_secret_key';

// Controller for handling user-related operations
const userController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { full_name, email, username, password } = req.body;

      // Validate required fields
      if (!full_name || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user with email or username already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already in use' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = await User.create({
        full_name,
        email,
        username,
        password: hashedPassword,
        role: 'user', // Default role
        certified: false // Default certification status
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Return user data (excluding password) and token
      return res.status(201).json({
        user: {
          id: newUser.id,
          full_name: newUser.full_name,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          certified: newUser.certified,
          created_at: newUser.created_at
        },
        token
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      // Find user by username
      const user = await User.findOne({
        where: { username }
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Return user data (excluding password) and token
      return res.status(200).json({
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          username: user.username,
          role: user.role,
          certified: user.certified,
          created_at: user.created_at
        },
        token
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get current user profile
  getProfile: async (req, res) => {
    try {
      // User is already available in req.user from authenticate middleware
      return res.status(200).json(req.user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { full_name, email } = req.body;

      // Find user
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user
      await user.update({
        full_name: full_name || user.full_name,
        email: email || user.email
      });

      // Fetch updated user
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Change password
  changePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      // Validate required fields
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current password and new password are required' });
      }

      // Find user
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await user.update({ password: hashedPassword });

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all users (admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update user role (admin only)
  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Validate role
      if (!['admin', 'moderator', 'user'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      // Find user
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update role
      await user.update({ role });

      // Fetch updated user
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Toggle user certification (admin only)
  toggleCertification: async (req, res) => {
    try {
      const { id } = req.params;

      // Find user
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Toggle certification
      await user.update({ certified: !user.certified });

      // Fetch updated user
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error toggling user certification:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete user (admin only or self-deletion)
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const requestingUserId = req.user.id;
      const isAdmin = req.user.role === 'admin';

      // Check if user is deleting themselves or is an admin
      if (parseInt(id) !== requestingUserId && !isAdmin) {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own account' });
      }

      // Find user
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete user
      await user.destroy();

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = userController;