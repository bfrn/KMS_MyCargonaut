import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);

const expect = chai.expect;

describe('create drive-offer', () => {
    it('should return status-code 200', (done) => {
      chai.request(app)
          .post('/api/users/123/drivingOffers/create')
          .send({
              date: '2014-08-15T22:00:00.000Z',
              origin: 'avc',
              destination: 'derf',
              restrictions: ['rede gerne',' richte mich nach Mitfahreren'],
              preferences:  ['rede gerne',' richte mich nach Mitfahreren'],
              price: '25.90',
              hasFixedPrice: true,
              cargoWeightInKg: 445,
              loadingSpaceDimensions: [432, 534, 3324],
              personCnt: 32,
              stops: ['Fried','Bauheim','Lin']
          })
          .end((err, res) => {
              expect(res).to.have.status(200)
              //check if the data in the database match with the data which was send to the server
              chai.request(app)
              .get('/api/users/123/drivingOffers')
              .end((err,res) => {
                expect(res.body.length).to.be.above(1)
                done()
              })  
            })
    })
})