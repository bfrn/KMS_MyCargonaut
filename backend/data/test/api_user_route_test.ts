import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

import * as mongoose from 'mongoose'
const User = require('../src/models/user.model');

chai.use(chaiHttp);

const expect = chai.expect;

describe('register user test', () => {
    it('should successfully add a user and delete it afterwards ', (done) => {
        let testUser = new User({
            username: 'jan123' ,
            password: 'test123',
            firstName: 'Jan',
            lastName: 'Schneider',
            birthdate: '2019-01-30T23:00:00Z',
            bio: 'Ich bin Student an der THM',
            street: 'Hauptstraße',
            houseNumber: '2c',
            img: 'testimage/image',
            zip: '4353',
            city: 'Hamburg',
            pkw: 'true',
            transporter: 'true',
            lkw: 'true',
        });
        //console.log(testUser)
        chai.request(app)
          .post('/api/users/register')
          .send(testUser)
          .end((err, res) => {
              expect(res).to.have.status(200);
              //check if the data in the database match with the data which was send to the serverdocker run -p 27017:27017 --rm  -d --network node_server -v $PWD/database/data:/data/db --name nodeDatabase mongo:latest
              chai.request(app)
              .get('/api/users/')
              .end((err,res) => {
                //console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                //expect(res.body.length).to.be.eql(1)
                expect(res.body[0]).to.have.property('firstName').eql('Jan');
                expect(res.body[0]).to.have.property('lastName').eql('Schneider');
                User.findByIdAndDelete(res.body[0]._id,(err, user) =>{
                    if (err) return err;
                });
                done()
              })  
        })
    })
});
