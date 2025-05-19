'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Formation = sequelize.define('Formation', {
    diploma: DataTypes.STRING,
    university: DataTypes.STRING,
    start_year: DataTypes.INTEGER,
    end_year: DataTypes.INTEGER
  }, {
    tableName: 'formations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Formation.associate = (models) => {
    Formation.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
  };

  return Formation;
};