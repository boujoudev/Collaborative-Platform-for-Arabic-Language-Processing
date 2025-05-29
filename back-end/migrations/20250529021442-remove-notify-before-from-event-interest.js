'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('event_interest', 'notify_before');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('event_interest', 'notify_before', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
