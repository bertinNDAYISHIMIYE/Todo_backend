/* eslint-disable import/extensions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index.js';
import mockData from './mocks/testData.js';

import { users } from '../models';

const token = jwt.sign(mockData.validLogin, 'secret', {
  expiresIn: '1d',
});
chai.should();
chai.use(chaiHttp);

describe('Test user registration', () => {
  it('It should not create user when name is incorrect', async () => {
    const res = await chai.request(app)
      .post('/api/users/signup').send(mockData.invalidName);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
  it('It should not create user when password is below 6 or null', async () => {
    const res = await chai.request(app)
      .post('/api/users/signup').send(mockData.invalidPassword);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
  it('It should not create user when email is invalid', async () => {
    const res = await chai.request(app)
      .post('/api/users/signup').send(mockData.invalidEmail);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
  it('should register user', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/signup')
      .send(mockData.signUpValid);
    res.should.have.status(201);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    await users.destroy({
      where: { email: mockData.signUpValid.email },
    });
  });

  it('should log a user in', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/signup')
      .send(mockData.signUpValid);
    res.should.have.status(201);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    const res1 = await chai
      .request(app)
      .post('/api/users/login')
      .send(mockData.validLogin);
    res1.should.have.status(200);
    res1.body.should.be.a('object');
    res1.body.should.have.property('status');
    res1.body.should.have.property('message');
    res1.body.should.have.property('token');
    await users.destroy({
      where: { email: mockData.signUpValid.email },
    });
  });
  it('It should not log user in when password is below 6 or null', async () => {
    const res = await chai.request(app)
      .post('/api/users/login').send(mockData.invalidPassword);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
  it('It should not log user in when email is invalid', async () => {
    const res = await chai.request(app)
      .post('/api/users/login').send(mockData.invalidEmail);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
  it('should log a user out', async () => {
    const response = await chai.request(app)
      .get('/api/users/logout')
      .set('authorization', token);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.should.have.property('message');
  });
});
