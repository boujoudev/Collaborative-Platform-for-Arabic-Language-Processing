module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_evaluations_entity_type" 
      ADD VALUE IF NOT EXISTS 'publication';
    `);
  },

  down: async () => {
    // Pas de suppression (voir remarque précédente)
  }
};
