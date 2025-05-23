'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ContactMe = sequelize.define('ContactMe', {
    portfolio: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    tableName: 'contact_mes',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  ContactMe.associate = (models) => {
    ContactMe.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
  };

  return ContactMe;
};