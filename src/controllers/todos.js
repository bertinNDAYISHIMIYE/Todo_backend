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

 static updateTodo = async (req, res) => {
   try {
     const token = req.header('Authorization');
     const { email } = jwt.verify(token, process.env.JWTKEY);
     const user = await users.findOne({ where: { email } });
     const { body } = req;
     const todoId = user.id;
     const { id } = req.params;
     const task = await todos.findOne({ where: { id, todoId } });
     if (task < 1) {
       (res.status(404).json({ status: 404, message: 'task not found' }));
     } else {
       todos.update(req.body, { fields: Object.keys(req.body), where: { id } });
       res.status(201).json({
         status: '201', message: ` updated task by ${email}`, body,
       });
     }
   } catch (error) {
     res.status(500).json({ status: 500, message: 'server error' });
   }
 }
}
