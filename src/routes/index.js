/* eslint-disable import/extensions */
import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../swagger.js';

const router = Router();

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
