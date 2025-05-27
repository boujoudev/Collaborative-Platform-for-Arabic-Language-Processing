'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rendre email nullable uniquement (car userId existe déjà et id est déjà supprimé)
    await queryInterface.changeColumn('contact_mes', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Recréer la colonne `id` comme clé primaire auto-incrémentée
    await queryInterface.addColumn('contact_mes', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });

    // 2. Supprimer le rôle de clé primaire de `userId`
    await queryInterface.changeColumn('contact_mes', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
      // ⚠️ Note : ce champ n'est plus primaryKey ici
    });

    // 3. Rendre `email` à nouveau obligatoire
    await queryInterface.changeColumn('contact_mes', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
