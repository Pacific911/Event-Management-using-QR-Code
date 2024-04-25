import { DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanyImages', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CompanyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CompanyImages');
  },
};
