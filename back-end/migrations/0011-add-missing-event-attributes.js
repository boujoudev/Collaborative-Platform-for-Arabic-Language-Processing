
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('events', 'type', {
      type: Sequelize.ENUM('online', 'in_person'),
      allowNull: false,
      defaultValue: 'online',
    });

    await queryInterface.addColumn('events', 'timezone', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('events', 'end_time', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('events', 'external_link', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('events', 'type');
    await queryInterface.removeColumn('events', 'timezone');
    await queryInterface.removeColumn('events', 'end_time');
    await queryInterface.removeColumn('events', 'external_link');
  },
};