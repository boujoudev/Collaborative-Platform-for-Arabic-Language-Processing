'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      entity_type: {
        type: Sequelize.ENUM('post', 'project', 'event', 'nlp_tool', 'corpus', 'course'),
        allowNull: false
      },
      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      entity_type: {
        type: Sequelize.ENUM('post', 'project', 'event', 'nlp_tool', 'corpus', 'course'),
        allowNull: false
      },
      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      vote: {
        type: Sequelize.INTEGER,
        validate: {
          isIn: [[-1, 1]]
        }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // Add indexes for polymorphic tables
    await queryInterface.addIndex('comments', ['entity_type', 'entity_id']);
    await queryInterface.addIndex('evaluations', ['entity_type', 'entity_id']);
    await queryInterface.addIndex('evaluations', ['user_id']);
    await queryInterface.addConstraint('evaluations', {
      fields: ['entity_type', 'entity_id', 'user_id'],
      type: 'unique',
      name: 'evaluations_unique_vote'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('evaluations');
    await queryInterface.dropTable('comments');
  }
};