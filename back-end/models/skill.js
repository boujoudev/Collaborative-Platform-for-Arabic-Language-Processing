'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    tableName: 'skills',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Skill.associate = (models) => {
    Skill.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE'
    });
  };

  return Skill;
};