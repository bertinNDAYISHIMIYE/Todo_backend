/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-console */
import express from 'express';
import '@babel/polyfill';
import router from '../src/routes/index.js';

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log('server has started at:', port);
});
export default app;
