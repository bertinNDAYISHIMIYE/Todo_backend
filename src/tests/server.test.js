/* eslint-disable import/extensions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index.js';

const { expect } = chai;
chai.use(chaiHttp);
describe('SERVER CONFIG CHECK', () => {
  it('Should check development error handler', (done) => {
    chai
      .request(app)
      .get('/wrong')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message', 'Page not found');
        done();
      });
  });

  it('Should display a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
