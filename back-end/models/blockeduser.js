'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const BlockedUser = sequelize.define('BlockedUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    blockerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'blocker_id'
    },
    blockedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'blocked_id'
    }
  }, {
    tableName: 'blocked_users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  BlockedUser.associate = (models) => {
    BlockedUser.belongsTo(models.User, {
      foreignKey: 'blocker_id',
      as: 'blocker',
      onDelete: 'CASCADE'
    });

    BlockedUser.belongsTo(models.User, {
      foreignKey: 'blocked_id',
      as: 'blocked',
      onDelete: 'CASCADE'
    });
  };

  return BlockedUser;
};