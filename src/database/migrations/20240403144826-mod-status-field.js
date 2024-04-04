/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Attendees', 'status', {
      type: Sequelize.ENUM('PENDING', 'APPROVED'),
      defaultValue: 'PENDING',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Attendees', 'status');
  },
};
