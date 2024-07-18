import {jwtConfig} from '../../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

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
