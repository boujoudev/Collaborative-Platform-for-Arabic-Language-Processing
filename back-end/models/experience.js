'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define('Experience', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    date: DataTypes.STRING  // 👈 Nouveau champ ajouté ici
  }, {
    tableName: 'Experiences',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
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