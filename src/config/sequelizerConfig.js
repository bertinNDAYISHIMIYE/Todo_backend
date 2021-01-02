import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: 'andela',
    password: null,
    database: 'todo_app',
    use_env_variable: process.env.DB_URL,
    url: process.env.DB_URL,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'andela',
    password: null,
    database: 'todo_app',
    use_env_variable: 'DB_URL_TEST',
    url: process.env.DB_URL_TEST,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'andela',
    password: null,
    database: 'todo_app',
    use_env_variable: 'DB_URL_PROD',
    url: process.env.DB_URL_PROD,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
