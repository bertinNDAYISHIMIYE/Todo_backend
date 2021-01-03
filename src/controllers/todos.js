/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { users, todos } from '../models';
import { Response } from '../helper/response';

export class todocontrollers {
static createDuty = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { email } = jwt.verify(token, process.env.JWTKEY);
    const user = await users.findOne({ where: { email } });
    const todo = await todos.create({
      name: req.body.name,
      content: req.body.content,
      complete: 'false',
      todoId: user.id,

    });
    res.status(201).json({
      status: 201,
      message: 'task created',
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

static getAllTasks = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { email } = jwt.verify(token, process.env.JWTKEY);

    const userTasks = await users.findAll({
      where: { email },
      include: [{
        model: todos,
        as: 'todo',
      }],
    });
    Response.success(res, 200, `returned all todos for ${email}`, userTasks);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error,
      message: 'server error',
    });
  }
}
}
