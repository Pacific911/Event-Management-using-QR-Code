/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Attendees', 'status', {
      type: Sequelize.ENUM('PAYMENT_REQUIRED', 'CONFIRMED', 'PAYMENT_FAILED'),
      defaultValue: 'CONFIRMED',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Attendees', 'status');
  },
};
