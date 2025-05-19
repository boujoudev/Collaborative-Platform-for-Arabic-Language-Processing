'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
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
        onDelete: 'CASCADE',
        allowNull: false
      },
      reported_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['User', 'Post', 'Comment', 'Publication', 'Course', 'Project', 'NLPTool']]
        }
      },
      reported_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'reviewed', 'resolved'),
        defaultValue: 'pending',
        allowNull: false
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

    // Optional: Add index for faster querying
    await queryInterface.addIndex('reports', ['reported_type', 'reported_id']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('reports');
  }
};