/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { usercontrollers } from '../controllers/users.js';
import { usersValidation } from '../middleware/validators/usersValidation.js';

const router = express.Router();
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: SignUp
 *     summary: Creates a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                name:
 *                 type: string
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *         required:
 *                -name
 *                -email
 *                -password
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in use by another account.
 * */
router.post('/signup', usersValidation.usersvalidation, usercontrollers.createAccount);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: login a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *         required:
 *                -email
 *                -password
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in use by another account.
 * */

router.post('/login', usersValidation.usersvalidation, usercontrollers.login);
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     tags:
 *       - Users
 *     name: logout
 *     summary: logout a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *             description: user logged out successfully.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: can't log user out.
 * */

router.get('/logout', verifyToken.checkUser, usercontrollers.logout);
export default router;
