/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Response } from './response.js';

export const base_response = (req, res, schema, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return Response.error(
      res,
      400,
      error.details[0].message.replace(/\"/g, ''),
    );
  }
  next();
};
