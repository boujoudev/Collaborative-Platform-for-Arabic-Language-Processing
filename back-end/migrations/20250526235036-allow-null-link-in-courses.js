module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('courses', 'link', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('courses', 'link', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
