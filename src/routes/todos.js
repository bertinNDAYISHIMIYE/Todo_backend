/* eslint-disable import/extensions */
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { todoValidation } from '../middleware/validators/todoValidations.js';
import { todocontrollers } from '../controllers/todos.js';

const router = express.Router();
/**
 * @swagger
 * /api/todos/add:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: add a task to todo list
 *     content:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             properties:
 *                content:
 *                 type: string
 *                complete:
 *                 type: boolean
 *     responses:
 *       200:
 *             description: User Duty successfully Created.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: Error creating Duty
 * */
router.post('/add', todoValidation.todovalidation, verifyToken.checkUser, todocontrollers.createDuty);
export default router;
