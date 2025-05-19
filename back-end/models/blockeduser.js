'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const BlockedUser = sequelize.define('BlockedUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    updatedAt: false,
    indexes: [
      {
        name: 'unique_blocker_blocked',
        unique: true,
        fields: ['blockerId', 'blockedId']
      }
    ]
  });

  BlockedUser.associate = (models) => {
    // A user can be a blocker
    BlockedUser.belongsTo(models.User, {
      foreignKey: 'blockerId',
      as: 'blocker',
      onDelete: 'CASCADE'
    });

    // A user can be blocked by others
    BlockedUser.belongsTo(models.User, {
      foreignKey: 'blockedId',
      as: 'blocked',
      onDelete: 'CASCADE'
    });
  };

  return BlockedUser;
};