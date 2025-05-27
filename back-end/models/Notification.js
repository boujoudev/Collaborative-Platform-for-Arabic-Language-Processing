const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Notification extends Model {}

Notification.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['NEW_MESSAGE', 'NEW_COMMENT', 'COMMENT_REPLY', 'EVENT_REMINDER', 'NEW_FOLLOWER', 'NEW_FORUM_MEMBER']]
    }
  },
  data: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Notification',
  tableName: 'notifications',
  timestamps: true
});

module.exports = Notification; 