/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import Joi from 'joi';
import { base_response } from '../../helper/joiResponse';

export class todoValidation {
static todovalidation = async (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().min(5).max(500).required(),
    complete: Joi.boolean().required(),
  });
  base_response(req, res, schema, next);
}
}
