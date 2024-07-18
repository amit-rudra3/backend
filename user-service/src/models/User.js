import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/db_user_task');
// const sequelize = new Sequelize('postgres://user:password@db:5432/db');

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { User, sequelize };
