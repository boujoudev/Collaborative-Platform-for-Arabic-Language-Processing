const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { Op } = Sequelize;

const { generateTokenAndSetCookie } = require('../service/generateTokenAndSetCookie.js');


const {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	//sendWelcomeEmail,
} = require('../sendgrid/sendgrid.service.js');
const { where } = require('sequelize');


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
      // verification Token 
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      // Create new user
      const newUser = await User.create({
        full_name,
        email,
        username,
        password: hashedPassword,
        role: 'user', // Default role
        certified: false, // Default certification status
        isVerified: false, // Default verification status 
        verificationToken,
			  verificationTokenExpiresAt: new Date(Date.now() + 3600000), // 24 hours
      });

      // Generate JWT token
      /*const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      */
      const token = generateTokenAndSetCookie(res, newUser.id, newUser.username, newUser.role);

      await sendVerificationEmail(newUser.email, verificationToken);
      // Return user data (excluding password) and token
      return res.status(201).json({
        user: {
          id: newUser.id,
          full_name: newUser.full_name,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          certified: newUser.certified,
          created_at: newUser.created_at,
          isVerified: newUser.isVerified,
          verificationToken: newUser.verificationToken,
			    verificationTokenExpiresAt:newUser.verificationTokenExpiresAt,
        },
        token
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },


  // verifyEmail
  verifyEmail: async (req, res) => {
    const { code } = req.body;
    try {
      const user = await User.findOne({
        where: {
          verificationToken: code,
          verificationTokenExpiresAt: {
            [Op.gt]: new Date(),
          },
        },
      });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
      }
      console.log("isVerified:", user.isVerified);
      user.isVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpiresAt = null;
      await user.save();
      await user.reload(); // ⬅ recharge l'utilisateur depuis la BDD
      console.log("Saved + reloaded isVerified:", user.isVerified);
  
      //await sendWelcomeEmail(user.email, user.name);
  
      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          username: user.username,
          role: user.role,
          certified: user.certified,
          created_at: user.created_at,
          isVerified: user.isVerified,
          verificationToken: user.verificationToken,
			    verificationTokenExpiresAt:user.verificationTokenExpiresAt,
        },
      });
    } catch (error) {
      console.log("error in verifyEmail ", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },



      verifyPendingEmail: async (req, res) => {
      const { code } = req.body;
      try {
        const user = await User.findOne({
          where: {
            verificationToken: code,
            verificationTokenExpiresAt: {
              [Op.gt]: new Date(),
            },
          },
        });

        if (!user) {
          return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        if (!user.pending_email) {
          return res.status(400).json({ success: false, message: "No pending email to verify" });
        }

        // Valider le nouvel email
        user.email = user.pending_email;
        user.pending_email = null;
        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiresAt = null;

        await user.save();
        await user.reload();

        res.status(200).json({
          success: true,
          message: "New email verified successfully",
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            role: user.role,
            certified: user.certified,
            created_at: user.created_at,
            isVerified: user.isVerified,
          },
        });
      } catch (error) {
        console.log("error in verifyPendingEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
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
      /*const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      */
      const token = generateTokenAndSetCookie(res, user.id, user.username, user.role);

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


  // Logout user
  logout: async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
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

    
    updateProfile: async (req, res) => {
      try {
        const userId = req.user.id;
        const { full_name, email } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        let emailChanged = false;

        if (email && email !== user.email) {
          emailChanged = true;

          const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
          const verificationTokenExpiresAt = new Date(Date.now() + 3600000); // 1h

          // ➕ change pending_email au lieu de email
          user.pending_email = email;
          user.verificationToken = verificationToken;
          user.verificationTokenExpiresAt = verificationTokenExpiresAt;

          await sendVerificationEmail(email, verificationToken);
        }

        if (full_name) {
          user.full_name = full_name;
        }

        await user.save();

        const updatedUser = await User.findByPk(userId, {
          attributes: { exclude: ['password'] }
        });

        return res.status(200).json({
          user: updatedUser,
          message: emailChanged
            ? "A verification code has been sent to your new email."
            : "Profile updated successfully."
        });

      } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    },



  // Request password reset
  requestPasswordReset: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = resetTokenExpiresAt;
  
      await user.save();
  
      // send email
      await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
  
      res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
      console.log("Error in forgotPassword ", error);
      res.status(400).json({ success: false, message: error.message });
    }

  },

  // Reset password
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      const user = await User.findOne({where:{
        resetPasswordToken: token,
        resetPasswordExpiresAt: { [Op.gt]: new Date() } // Check if token is not expired,
      }});
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
      }
  
      // update password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;
      await user.save();
  
      await sendResetSuccessEmail(user.email);
  
      res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
      console.log("Error in resetPassword ", error);
      res.status(400).json({ success: false, message: error.message });
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

        if (parseInt(id) === requestingUserId) {
        res.clearCookie('token', {
          httpOnly: true,
          secure: true, // à activer uniquement si tu es en HTTPS
          sameSite: 'strict'
        });
      }



        return res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    },

 uploadProfilePhoto: async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune photo téléchargée' });
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer l'ancienne photo si elle existe
    if (user.profile_picture) {
      const oldPhotoPath = path.join(__dirname, '..', user.profile_picture);
      fs.unlink(oldPhotoPath, (err) => {
        if (err) {
          console.warn("Erreur lors de la suppression de l'ancienne photo :", err.message);
        } else {
          console.log("Ancienne photo supprimée :", oldPhotoPath);
        }
      });
    }

    // Mettre à jour avec la nouvelle photo
    user.profile_picture = `/uploads/photos_de_profil/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      message: 'Photo de profil mise à jour',
      profile_picture: user.profile_picture
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'upload de la photo' });
  }
},



  // Modifier la bio d'un user
// Modifier la bio d'un user
updateBio: async (req, res) => {
  try {
    const userId = req.params.id;
    const { bio } = req.body;

    // Vérifie uniquement que la bio n'est pas undefined ou null (autorise chaîne vide)
    if (bio === undefined || bio === null) {
      return res.status(400).json({ error: "Le champ bio est requis" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    user.bio = bio;
    await user.save();

    return res.status(200).json({ message: "Bio mise à jour avec succès", bio: user.bio });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
},


  // Modifier les préférences linguistiques
  updatePreferencesLinguistiques: async (req, res) => {
    try {
      const userId = req.params.id;
      const { preferencesLinguistiques } = req.body;

      if (!preferencesLinguistiques) {
        return res.status(400).json({ error: "Le champ preferencesLinguistiques est requis" });
      }

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

      user.preferencesLinguistiques = preferencesLinguistiques;
      await user.save();

      return res.status(200).json({ message: "Préférences linguistiques mises à jour", preferencesLinguistiques: user.preferencesLinguistiques });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },

};




module.exports = userController;