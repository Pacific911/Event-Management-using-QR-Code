import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Events from './events';

const Attendees = sequelize.define('Attendees', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  names: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('PAYMENT_REQUIRED', 'CONFIRMED', 'PAYMENT_FAILED'),
    defaultValue: 'CONFIRMED',
  },
  EventId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

Attendees.belongsTo(Events, { as: 'Event', onDelete: 'cascade' });

export default Attendees;
