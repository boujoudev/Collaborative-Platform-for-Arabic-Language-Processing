'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Admin User',
        username: 'admin1',
        email: 'admin@example.com',
        password: 'hashed_password',
        role: 'admin',
        certified: true,
        created_at: new Date()
      },
      {
        full_name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'user',
        certified: false,
        created_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};