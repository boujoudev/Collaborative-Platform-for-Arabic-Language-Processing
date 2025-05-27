'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Supprimer la contrainte de clé étrangère
    await queryInterface.removeConstraint('courses', 'courses_category_id_fkey');

    // 2. Supprimer la colonne category_id
    await queryInterface.removeColumn('courses', 'category_id');

    // 3. Supprimer la table course_categories
    await queryInterface.dropTable('course_categories');
  },

  down: async (queryInterface, Sequelize) => {
    // Pour revenir en arrière, il faut recréer la table, la colonne et la contrainte

    // 1. Recréer la table course_categories (exemple simple, adapte selon ta structure)
    await queryInterface.createTable('course_categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // 2. Ajouter la colonne category_id à courses
    await queryInterface.addColumn('courses', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'course_categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    });

    // 3. Ajouter la contrainte de clé étrangère
    // (généralement ajoutée automatiquement par addColumn avec references)
  }
};
