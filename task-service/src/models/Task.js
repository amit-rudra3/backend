import { Sequelize, DataTypes } from 'sequelize';
import { dbConfig } from '../../config/config.js';

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/db_user_task');
// const sequelize = new Sequelize('postgres://user:password@db:5432/db');

const Task = sequelize.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false, 
  tableName: 'tasks' 
});

export { Task, sequelize };
