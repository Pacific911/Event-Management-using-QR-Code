/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'paymentEnabled', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('Events', 'paymentAmount', {
      type: Sequelize.STRING,
      defaultValue: '0',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Events', 'paymentEnabled');
    await queryInterface.removeColumn('Events', 'paymentAmount');
  },
};
