/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-console */
import express from 'express';
import '@babel/polyfill';
// import Sequelize from 'sequelize';
import router from '../src/routes/index.js';

// export const db = new Sequelize('postgres://andela@localhost:5432/todo_app');

// db.authenticate().then(() => { console.log('Connection has been established successfully.'); }).catch((error) => { console.error('Unable to connect to the database:', error); });
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log('server has started at:', port);
});
export default app;
