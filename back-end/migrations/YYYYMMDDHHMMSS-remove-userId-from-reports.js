module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reports', 'userId');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reports', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};