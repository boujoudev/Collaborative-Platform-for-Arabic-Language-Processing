'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatHistory = sequelize.define('ChatHistory', {
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    input_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'chat_history', // Explicitly set the table name
    timestamps: false, // Disable Sequelize's default timestamps if not needed
  });

  return ChatHistory;
};