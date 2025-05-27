module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_evaluations_entity_type" 
      ADD VALUE IF NOT EXISTS 'publication';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // ATTENTION : PostgreSQL ne permet pas de supprimer une valeur ENUM facilement.
    // Il faudrait recréer tout le type, ce qui est complexe et risqué, donc on laisse vide.
  }
};
