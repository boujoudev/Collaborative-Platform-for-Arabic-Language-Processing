const { Notification } = require('../models');
const socketIO = require('../config/socketio');
const { Op } = require('sequelize');

const notificationController = {
  // Get all notifications for the current user
  getUserNotifications: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const notifications = await Notification.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit: 50 // Limit to recent 50 notifications
      });
      
      return res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  // Mark a specific notification as read
  markAsRead: async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      
      const notification = await Notification.findOne({
        where: { id, userId }
      });
      
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      
      await notification.update({ read: true });
      
      // Emit socket event to update real-time notification count
      const io = socketIO.getIO();
      io.to(`user_${userId}`).emit('notification_read', { id });
      
      return res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  // Mark all notifications as read for the current user
  markAllAsRead: async (req, res) => {
    try {
      const userId = req.user.id;
      
      await Notification.update(
        { read: true },
        { where: { userId, read: false } }
      );
      
      // Emit socket event to update real-time notification count
      const io = socketIO.getIO();
      io.to(`user_${userId}`).emit('all_notifications_read');
      
      return res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  // Get unread notification count for the current user, separated by type
  getUnreadCount: async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Count message notifications
      const messageCount = await Notification.count({
        where: { 
          userId, 
          read: false,
          type: 'NEW_MESSAGE'
        }
      });
      
      // Count all other notification types
      const otherCount = await Notification.count({
        where: { 
          userId, 
          read: false,
          type: {
            [Op.ne]: 'NEW_MESSAGE' // Op.ne means "not equal"
          }
        }
      });
      
      // Get total unread count
      const totalCount = messageCount + otherCount;
      
      return res.status(200).json({
        total: totalCount,
        messages: messageCount,
        other: otherCount
      });
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  // Delete a notification
  deleteNotification: async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      
      const notification = await Notification.findOne({
        where: { id, userId }
      });
      
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      
      await notification.destroy();
      
      // Emit socket event to update real-time notifications
      const io = socketIO.getIO();
      io.to(`user_${userId}`).emit('notification_deleted', { id });
      
      return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  // Delete all notifications for the current user
  clearAllNotifications: async (req, res) => {
    try {
      const userId = req.user.id;
      
      await Notification.destroy({
        where: { userId }
      });
      
      // Emit socket event to update real-time notifications
      const io = socketIO.getIO();
      io.to(`user_${userId}`).emit('all_notifications_cleared');
      
      return res.status(200).json({ message: 'All notifications cleared successfully' });
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  // Get all non-message notifications for the current user
  getNonMessageNotifications: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const notifications = await Notification.findAll({
        where: { 
          userId,
          type: {
            [Op.ne]: 'NEW_MESSAGE' // Exclude message notifications
          }
        },
        order: [['createdAt', 'DESC']],
        limit: 50 // Limit to recent 50 notifications
      });
      
      return res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching non-message notifications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = notificationController;