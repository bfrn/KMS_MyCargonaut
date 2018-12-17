import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

import * as mongoose from 'mongoose'
const User = require('../src/models/user.model')

chai.use(chaiHttp);

const expect = chai.expect;

describe('register user test', () => {
    it('should return status-code 200', (done) => {
        let testUser = new User({
            email: 'Jan@webmail.de',
            password: 'test123',
            firstName: 'Jan',
            lastName: 'Schneider',
            birthdate: '1990-08-15T22:00:00.000Z',
            bio: 'Ich bin Student an der THM',
            street: 'Hauptstraße',
            houseNumber: '2c',
            zip: '4353',
            city: 'Hamburg',
        })
        chai.request(app)
          .post('/api/users/register')
          .send(testUser)
          .end((err, res) => {
              expect(res).to.have.status(200)
              //check if the data in the database match with the data which was send to the server
              chai.request(app)
              .get('/api/users/')
              .end((err,res) => {
                console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                expect(res.body.length).to.be.eql(1)
                expect(res.body[0]).to.have.property('firstName').eql('Jan')
                expect(res.body[0]).to.have.property('lastName').eql('Schneider')
                console.log(res.body[0]._id)
                User.findByIdAndDelete(res.body[0]._id,(err, user) =>{
                    if (err){
                        return err
                    }
                })
                done()
              })  
        })
    })
})
