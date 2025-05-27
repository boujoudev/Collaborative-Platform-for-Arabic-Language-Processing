'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_forums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      forumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'forums',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    // Optional unique constraint to prevent duplicate follows
    await queryInterface.addConstraint('user_forums', {
      fields: ['userId', 'forumId'],
      type: 'unique',
      name: 'unique_user_forum'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_forums');
  }
};