'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'link', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'link');
  }
};
