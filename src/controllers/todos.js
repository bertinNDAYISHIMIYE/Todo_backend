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
    res.status(500).json({ status: 500, message: 'server error' });
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

 static markcompleted = async (req, res) => {
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
     }
     const comp = task.complete;
     if (comp !== true) {
       todos.update(req.body, { fields: Object.keys(req.body), where: { id } });
       res.status(201).json({
         status: '201', message: ` updated task by ${email}`, body,
       });
     } else {
       res.status(400).json({
         status: '400', message: 'task already marked done',
       });
     }
   } catch (error) {
     res.status(500).json({ status: 500, message: 'server error' });
   }
 }

 static deleteCompleted = async (req, res) => {
   try {
     const token = req.header('Authorization');
     const { email } = jwt.verify(token, process.env.JWTKEY);
     const user = await users.findOne({ where: { email } });
     const todoId = user.id;
     const { id } = req.params;
     const task = await todos.findOne({ where: { id, todoId } });
     if (task < 1) {
       res.status(404).json({ status: 404, message: 'todo not found' });
     }
     const comp = task.complete;
     if (comp === true) {
       todos.destroy({ where: { id, complete: true } });
       res.status(201).json({ status: '200', message: ` ${email} deleted one task`, task });
     } else {
       res.status(400).json({ status: 400, message: 'task not completed' });
     }
   } catch (error) {
     res.status(500).json({
       status: 500,
       message: 'server error',
     });
   }
 }
}
