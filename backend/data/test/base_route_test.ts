import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);

const expect = chai.expect;

describe('test main route', () => {
  it('should return status-code 200', (done) => {
    chai.request(app)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
  })
})
