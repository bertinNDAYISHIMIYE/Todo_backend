/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { hashPassword } from '../helper/hash.js';
import { users } from '../models';

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
        console.log('>><><><>><><><><><><><><>><><<><><><>', user);
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
  }
}
