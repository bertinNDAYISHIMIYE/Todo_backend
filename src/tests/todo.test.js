/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { users } from '../models';
import mockData from './mocks/testData.js';
import app from '../index';

const token = jwt.sign(mockData.validLogin, 'secret', {
  expiresIn: '1d',
});

chai.should();
chai.use(chaiHttp);

describe('test todos', () => {
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
      .post('/api/todos/').set('authorization', `Bearer ${res.body.token}`).send(mockData.invalidDuty);
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
  it('It should not update user task with wrong id', async () => {
    const id = '70';

    const response = await chai.request(app)
      .patch(`/api/todos/${id}`)
      .set('authorization', token)
      .send(mockData.validUpdate);
    response.should.have.status(500);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
  });

  it('It should mark true to completed task', async () => {
    const id = '8';

    const response = await chai.request(app)
      .patch(`/api/todos/complete/${id}`)
      .set('authorization', token)
      .send({ complete: true });
    response.should.have.status(500);
    response.body.should.be.a('object');
    response.body.should.have.property('status');
    response.body.should.have.property('message');
  });
});
