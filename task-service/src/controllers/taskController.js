import { Task } from '../models/Task.js';
import jwt from 'jsonwebtoken';
import { secret_key } from '../../config/config.js';


export const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret_key, async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const newTask = await Task.create({
        title,
        description,
        user_id: decoded.id,
        status,
        due_date
      });

      res.status(201).send(newTask);
    });
  } catch (error) {
    res.status(500).send({ message: 'Error creating task', error });
  }
};


export const getTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching tasks', error });
    }
  };
  

export const getTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (task) {
        res.status(200).send(task);
      } else {
        res.status(404).send({ message: `Task with ID ${id} not found` });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error fetching task', error });
    }
  };
  

export const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, due_date } = req.body;
      
  
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return res.sendStatus(401);

      jwt.verify(token, secret_key, async (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log("HI");
        const task = await Task.findByPk(id);
        if (!task) {
          return res.status(404).send({ message: `Task with ID ${id} not found` });
        }
  
        if (task.user_id !== decoded.id) {
          return res.status(403).send({ message: 'You are not authorized to update this task' });
        }
  
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.due_date = due_date || task.due_date;
  
        await task.save();
        res.status(200).send(task);
      });
    } catch (error) {
      res.status(500).send({ message: 'Error updating task', error });
    }
  };
  

export const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return res.sendStatus(401);
  
      jwt.verify(token, secret_key, async (err, decoded) => {
        if (err) return res.sendStatus(403);
  
        const task = await Task.findByPk(id);
        if (!task) {
          return res.status(404).send({ message: `Task with ID ${id} not found` });
        }
  
        if (task.user_id !== decoded.id) {
          return res.status(403).send({ message: 'You are not authorized to delete this task' });
        }
  
        await task.destroy();
        res.status(200).send({ message: `Task with ID ${id} deleted` });
      });
    } catch (error) {
      res.status(500).send({ message: 'Error deleting task', error });
    }
  };
  
