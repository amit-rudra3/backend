import {jwtConfig} from '../../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/db_user_task');

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(jwtConfig.secret);
  
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: `Unable to log in ${error}` });
  }
};


export const logout = async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(400).json({ message: 'No Token Provided' });

  try {
    await sequelize.query('INSERT INTO blacklisted_tokens (token) VALUES ($1)', [token]);
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to Logout' });
    console.log(err);
  }
};
