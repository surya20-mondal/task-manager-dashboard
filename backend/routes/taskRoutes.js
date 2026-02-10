import express from 'express';
import { body, param } from 'express-validator';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2 }),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status')
  ],
  createTask
);

router.get('/', getTasks);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status')
  ],
  updateTask
);

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid task ID')], deleteTask);

export default router;
