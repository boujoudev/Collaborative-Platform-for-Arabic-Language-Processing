module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('nlp_tools', 'domaine', {
      type: Sequelize.STRING(100),
      allowNull: true, // ou false selon ton besoin
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('nlp_tools', 'domaine');
  }
};
