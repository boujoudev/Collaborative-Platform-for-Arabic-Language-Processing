'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le nom de la compétence est requis.' },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'user_id doit être un entier.' },
        notNull: { msg: 'user_id est requis.' },
      },
    },
  }, {
    tableName: 'Skills',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
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
