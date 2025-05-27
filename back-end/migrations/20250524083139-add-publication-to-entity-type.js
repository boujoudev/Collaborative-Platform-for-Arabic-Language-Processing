'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_comments_entity_type"
      ADD VALUE IF NOT EXISTS 'publication';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // PostgreSQL ne permet pas de supprimer directement une valeur ENUM,
    // donc pour le down, tu dois recréer le type sans la valeur ajoutée (optionnel)
  }
};
