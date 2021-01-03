/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { todos } from '../models';
import mockData from './mocks/testData.js';
import app from '../index';

const token = jwt.sign(mockData.validLogin, process.env.JWTKEY, {
  expiresIn: '1d',
});

chai.should();
chai.use(chaiHttp);

describe('test duty endpoints', () => {
  it('should add a task', async () => {
    const response = await chai.request(app)
      .post('/api/todos/add')
      .set('authorization', token)
      .send(mockData.validDuty);
    response.should.have.status(201);
    response.body.should.be.a('object');
    response.body.should.have.property('message');
    response.body.should.have.property('data');
  });
  it('It should not create a duty when input are incorrect', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .send(mockData.validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .post('/api/todos/add').set('authorization', `Bearer ${res.body.token}`).send(mockData.invalidDuty);
    response.should.have.status(400);
    response.body.should.be.a('object');
  });
  it('It should not display tasks to not loggedin user', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .send(mockData.invalidLogin);
    res.should.have.status(400);
    res.body.should.be.a('object');

    const response = await chai.request(app)
      .get('/api/todos/');
    response.should.have.status(401);
    response.body.should.be.a('object');
  });
  it('It should display user todos', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .send(mockData.validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');

    const response = await chai.request(app)
      .get('/api/todos')
      .set('authorization', token);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.should.have.property('msg');
    response.body.should.have.property('data');
  });
});
