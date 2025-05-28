const { Notification } = require('../models');

class NotificationService {
  constructor(io) {
    this.io = io;
  }

  // Send notification to a specific user
  async sendNotification(userId, type, data) {
    try {
      // Create notification in database
      const notification = await Notification.create({
        userId,
        type,
        data: JSON.stringify(data),
        read: false
      });

      // Emit notification to user's room
      this.io.to(`user_${userId}`).emit('notification', {
        id: notification.id,
        type,
        data,
        createdAt: notification.createdAt
      });

      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // Handle new message notification
  async handleNewMessage(senderId, receiverId, message) {
    await this.sendNotification(receiverId, 'NEW_MESSAGE', {
      senderId,
      messageId: message.id,
      content: message.content
    });
  }

  // Handle new comment notification
  async handleNewComment(postId, commenterId, postOwnerId, comment) {
    await this.sendNotification(postOwnerId, 'NEW_COMMENT', {
      postId,
      commenterId,
      commentId: comment.id,
      content: comment.content
    });
  }

  // Handle comment reply notification
  async handleCommentReply(postId, replierId, commentOwnerId, reply) {
    await this.sendNotification(commentOwnerId, 'COMMENT_REPLY', {
      postId,
      replierId,
      replyId: reply.id,
      content: reply.content
    });
  }

  // Handle event reminder notification
  async handleEventReminder(userId, event) {
    await this.sendNotification(userId, 'EVENT_REMINDER', {
      eventId: event.id,
      title: event.title,
      startTime: event.startTime
    });
  }

  // Handle new follower notification
  async handleNewFollower(followerId, followedId) {
    await this.sendNotification(followedId, 'NEW_FOLLOWER', {
      followerId
    });
  }

  // Handle new forum member notification
  async handleNewForumMember(userId, forumId, forumOwnerId) {
    await this.sendNotification(forumOwnerId, 'NEW_FORUM_MEMBER', {
      userId,
      forumId
    });
  }

  // Handle comment edit notification
  async handleCommentEdited(entityId, editorId, recipientId, comment, entityType) {
    await this.sendNotification(recipientId, 'COMMENT_EDITED', {
      entityId,
      entityType,
      editorId,
      commentId: comment.id,
      content: comment.content
    });
  }
}

module.exports = NotificationService;