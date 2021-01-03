/* eslint-disable import/extensions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index.js';
import mockData from './mocks/testData.js';

import { users } from '../models';

const token = jwt.sign(mockData.validLogin, process.env.JWTKEY, {
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
    // res.body.should.have.property('status');
    // res.body.should.have.property('message');
  });
  it('It should not create user when email is invalid', async () => {
    const res = await chai.request(app)
      .post('/api/users/signup').send(mockData.invalidEmail);
    res.should.have.status(400);
    res.body.should.be.a('object');
    // res.body.should.have.property('status');
    // res.body.should.have.property('message');
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
    users.destroy({
      where: { email: mockData.signUpValid.email },
    });
  });

  it('should log a user in', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .send(mockData.validLogin);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status');
    res.body.should.have.property('message');
    res.body.should.have.property('token');
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
