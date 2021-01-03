/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

import { Response } from '../helper/response.js';

export class verifyToken {
  static checkUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return Response.error(res, 401, 'Access denied. no token provided ');
    try {
      const decode = jwt.verify(token, process.env.JWTKEY);
      req.user = decode;
      return next();
    } catch (error) {
      return Response.error(res, 401, 'Invalid token.');
    }
  }
}
