'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('comments');

    if (!tableDefinition.parent_id) {
      await queryInterface.addColumn('comments', 'parent_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      await queryInterface.addIndex('comments', ['parent_id']);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('comments', ['parent_id']);
    await queryInterface.removeColumn('comments', 'parent_id');
  }
};
