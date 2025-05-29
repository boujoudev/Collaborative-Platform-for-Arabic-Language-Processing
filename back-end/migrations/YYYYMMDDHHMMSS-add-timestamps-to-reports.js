module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('reports');

    if (!table.created_at) {
      await queryInterface.addColumn('reports', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    if (!table.updated_at) {
      await queryInterface.addColumn('reports', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reports', 'created_at');
    await queryInterface.removeColumn('reports', 'updated_at');
  }
};
