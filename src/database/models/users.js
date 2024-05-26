import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Users = sequelize.define('Users', {
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
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'ATTENDEE', 'SUPER_ADMIN'),
    defaultValue: 'ATTENDEE',
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default Users;
