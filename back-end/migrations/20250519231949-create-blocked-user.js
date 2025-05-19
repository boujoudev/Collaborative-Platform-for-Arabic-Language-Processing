'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blocked_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blockerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
        field: 'blocker_id'
      },
      blockedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
        field: 'blocked_id'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add unique constraint to prevent duplicate blocking
    await queryInterface.addConstraint('blocked_users', {
      fields: ['blockerId', 'blockedId'],
      type: 'unique',
      name: 'unique_blocker_blocked'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('blocked_users');
  }
};