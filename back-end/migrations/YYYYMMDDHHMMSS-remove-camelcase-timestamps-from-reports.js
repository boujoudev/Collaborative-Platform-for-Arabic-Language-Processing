module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reports', 'createdAt');
    await queryInterface.removeColumn('reports', 'updatedAt');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reports', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('reports', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  }
};