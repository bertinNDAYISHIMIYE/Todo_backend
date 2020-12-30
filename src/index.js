/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-console */
import express from 'express';
import router from '../src/routes/index.js';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log('server has started at:', port);
});
export default app;
