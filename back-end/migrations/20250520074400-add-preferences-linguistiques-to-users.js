'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'preferences_linguistiques', {
      type: Sequelize.ENUM('english', 'arab'),
      defaultValue: 'english',
      allowNull: false
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'preferences_linguistiques');
  }
};
