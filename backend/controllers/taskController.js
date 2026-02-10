import { validationResult } from 'express-validator';
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      user: req.userId,
      title,
      description,
      status,
      dueDate: dueDate || null
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while creating task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { search = '', status } = req.query;

    const query = {
      user: req.userId,
      title: { $regex: search, $options: 'i' }
    };

    if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const allowedFields = ['title', 'description', 'status', 'dueDate'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.userId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while deleting task' });
  }
};
