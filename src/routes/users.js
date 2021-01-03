/* eslint-disable import/extensions */
import express from 'express';
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

export default router;
