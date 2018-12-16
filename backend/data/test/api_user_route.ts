import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { RSA_NO_PADDING } from 'constants';

chai.use(chaiHttp);

const expect = chai.expect;

describe('register user test', () => {
    it('should return status-code 200', (done) => {
      chai.request(app)
          .post('/api/users/register')
          .send({
              username: 'Marc-Uwe Kling',
              password: 'test_123',
              birthdate: '1982-08-15T22:00:00.000Z',
              bio: 'Ich bin eine Kleinkünstler aus Berlin',
              street: 'Hauptstraße',
              houseNumber: '1a',
              zip: '100115',
              city: 'Berlin'
          })
          .end((err, res) => {
              expect(res).to.have.status(200)
              //check if the data in the database match with the data which was send to the server
              chai.request(app)
              .get('/api/users')
              .end((err,res) => {
                expect(res.body.length).to.be.above(1)
                done()
              })  
            })
    })
})
