// models/Notification.js
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['NEW_MESSAGE', 'NEW_COMMENT', 'COMMENT_REPLY', 'EVENT_REMINDER', 'NEW_FOLLOWER', 'NEW_FORUM_MEMBER', 'COMMENT_EDITED']]
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
    tableName: 'notifications',
    timestamps: true
  });

  Notification.associate = (models) => {
    // associations if needed
    // Notification.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Notification;
};
