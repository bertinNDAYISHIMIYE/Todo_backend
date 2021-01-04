/* eslint-disable import/extensions */
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { todoValidation } from '../middleware/validators/todoValidations.js';
import { todocontrollers } from '../controllers/todos.js';

const router = express.Router();
/**
 * @swagger
 * /api/todos/:
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
 *             description: server error
 * */
router.post('/', todoValidation.todovalidation, verifyToken.checkUser, todocontrollers.createDuty);
/**
 * @swagger
 * /api/todos:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: get all user's todos
 *     content:
 *       - application/json
 *     parameters:
 *       - name: Athorization
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: User task successfully retrieved.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: server error
 * */
router.get('/', verifyToken.checkUser, todocontrollers.getAllTasks);
/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Update a todo
 *     content:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
  *       - name: id
 *         in: path
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
 *             description: User Duty successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: server error
 * */

router.patch('/:id', verifyToken.checkUser, todocontrollers.updateTodo);
/**
 * @swagger
 * /api/todos/complete/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: change completed to true
 *     content:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
  *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             properties:
 *                complete:
 *                 type: boolean
 *     responses:
 *       200:
 *             description: User Duty successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: server error
 * */
router.patch('/complete/:id', verifyToken.checkUser, todocontrollers.markcompleted);
/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: delete a todo
 *     content:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
  *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: task deleted.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: server error
 * */
router.delete('/:id', todocontrollers.deleteCompleted);
export default router;
