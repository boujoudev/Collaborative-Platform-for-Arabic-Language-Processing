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
    notifyMe: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    forumId: DataTypes.INTEGER
  }, {
    tableName: 'user_forums',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
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