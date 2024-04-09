import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Users from './users';
import Events from './events';

const Companies = sequelize.define('Companies', {
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
  telephone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

Companies.belongsTo(Users, { as: 'User', onDelete: 'cascade' });
Companies.hasMany(Events, { as: 'Events', onDelete: 'cascade' });
export default Companies;
