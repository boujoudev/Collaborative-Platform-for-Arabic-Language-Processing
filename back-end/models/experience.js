'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define('Experience', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    tableName: 'experiences',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Experience.associate = (models) => {
    Experience.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE'
    });
  };

  return Experience;
};