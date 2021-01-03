/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import { hashPassword } from '../helper/hash.js';
import { users } from '../models';
import JWTKEY from '../config/env.js';

export class usercontrollers {
  static createAccount = async (req, res) => {
    try {
      const findUser = await users.findOne({ where: { email: req.body.email } });
      if (findUser) {
        (res.status(400).json({ status: 400, message: 'User alredy exist' }));
      } else {
        const newPassword = await hashPassword(req.body.password);
        const user = await users.create({
          name: req.body.name,
          email: req.body.email,
          password: newPassword,
        });
        res.status(201).json({
          status: 201,
          message: 'user created',
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json(
        {
          status: 500,
          message: 'server error',
        },
      );
    }
  };

  static login = async (req, res) => {
    try {
      const user = { email: req.body.email, password: req.body.password };
      const token = jwt.sign({

        email: req.body.email,
        userId: user.id,

      },
      JWTKEY,
      { expiresIn: '1hr' });

      res.status(200).json({ status: 200, message: `user ${user.name} is logged in with below token`, token });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'server error',
      });
    }
  };

  static logout = async (req, res) => {
    try {
      return res.status(200).json({
        message: 'User logout successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'server error',
      });
    }
  };
}
