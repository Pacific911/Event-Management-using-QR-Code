import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Companies from './company';

const Events = sequelize.define('Events', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slotNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
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
});

Events.belongsTo(Companies, { as: 'Company', onDelete: 'cascade' });
export default Events;
