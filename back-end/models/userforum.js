'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UserForum = sequelize.define('UserForum', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    forumId: DataTypes.INTEGER
  }, {
    tableName: 'user_forums',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  UserForum.associate = (models) => {
    UserForum.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    UserForum.belongsTo(models.Forum, {
      foreignKey: 'forumId',
      as: 'forum'
    });
  };

  return UserForum;
};