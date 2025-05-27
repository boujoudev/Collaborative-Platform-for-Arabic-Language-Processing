'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'domain', {
      type: Sequelize.STRING,
      allowNull: true,  // ou false si tu veux que ce soit obligatoire
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'domain');
  }
};
