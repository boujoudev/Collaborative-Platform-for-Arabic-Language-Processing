'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('users', 'profile_picture', {
        type: Sequelize.STRING(255),
        allowNull: true
      }),
      queryInterface.addColumn('users', 'bio', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'lastLogin', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }),
      queryInterface.addColumn('users', 'isVerified', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),
      queryInterface.addColumn('users', 'resetPasswordToken', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'resetPasswordExpiresAt', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'verificationToken', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'verificationTokenExpiresAt', {
        type: Sequelize.DATE,
        allowNull: true
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('users', 'profile_picture'),
      queryInterface.removeColumn('users', 'bio'),
      queryInterface.removeColumn('users', 'lastLogin'),
      queryInterface.removeColumn('users', 'isVerified'),
      queryInterface.removeColumn('users', 'resetPasswordToken'),
      queryInterface.removeColumn('users', 'resetPasswordExpiresAt'),
      queryInterface.removeColumn('users', 'verificationToken'),
      queryInterface.removeColumn('users', 'verificationTokenExpiresAt')
    ]);
  }
};
