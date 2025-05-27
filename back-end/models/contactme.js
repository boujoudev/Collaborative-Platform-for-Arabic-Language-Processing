'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactMe = sequelize.define('ContactMe', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Déclaré comme clé primaire
      field: 'userId' 
    },
    portfolio: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: true // Nullable maintenant
    },
    phone: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    tableName: 'contact_mes',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    // Important : dire à Sequelize de NE PAS générer l'ID auto
    freezeTableName: true,
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
