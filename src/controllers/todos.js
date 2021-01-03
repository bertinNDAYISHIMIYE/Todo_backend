/* eslint-disable import/prefer-default-export */
import { users, Todos } from '../models';

export class todocontrollers {
static createDuty = async (req, res) => {
  try {
    const todo = await Todos.create({
      name: req.body.name,
      content: req.body.content,
      complete: 'false',
      dutyid: users.id,

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
}
