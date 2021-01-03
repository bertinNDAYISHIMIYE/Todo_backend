/* eslint-disable import/extensions */
import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../swagger.js';
import users from './users.js';
import todos from './todos.js';

const router = Router();

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use('/api/users', users);
router.use('/api/todos', todos);

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: '.welcome to my api (:',
  });
});

router.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});
export default router;
