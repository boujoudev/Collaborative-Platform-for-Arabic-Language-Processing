'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_forums', 'notifyMe', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('user_forums', 'notifyMe');
  }
};
