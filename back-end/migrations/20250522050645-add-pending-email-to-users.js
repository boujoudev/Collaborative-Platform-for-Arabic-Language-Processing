'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'pending_email', {
      type: Sequelize.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'pending_email');
  }
};
