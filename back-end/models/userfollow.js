'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UserFollow = sequelize.define('UserFollow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'user_follows',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  UserFollow.associate = (models) => {
    UserFollow.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'follower',
      onDelete: 'CASCADE'
    });

    UserFollow.belongsTo(models.User, {
      foreignKey: 'followingId',
      as: 'following',
      onDelete: 'CASCADE'
    });
  };

  return UserFollow;
};