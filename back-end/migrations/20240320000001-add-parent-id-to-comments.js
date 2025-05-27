'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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

    // Add index for better query performance
    await queryInterface.addIndex('comments', ['parent_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('comments', ['parent_id']);
    await queryInterface.removeColumn('comments', 'parent_id');
  }
}; 