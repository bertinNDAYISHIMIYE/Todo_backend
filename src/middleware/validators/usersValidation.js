/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import Joi from 'joi';
import { base_response } from '../../helper/joiResponse';

export class usersValidation {
static usersvalidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  });
  base_response(req, res, schema, next);
}

static usersvalidationlogin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  });
  base_response(req, res, schema, next);
}
}
