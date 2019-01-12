import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

import * as mongoose from 'mongoose'
const User = require('../src/models/user.model');

chai.use(chaiHttp);

const expect = chai.expect;

/**
 * let userSchema = new Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   birthdate: {type: Date, required: true},
   phone: {type: Number, required: true},
   mail: {type: String, required: true},
   img: {type: String, required: true},
   bio: {type:String,required: true},           
   street: {type: String, required: true},      //Straße
   houseNumber: {type: String, required: true}, //Hausnummer
   zip: {type: Number, required: true},         //PLZ
   city: {type: String, required: true},       //Ort
   pkw: {type: String, required: true},
   transporter:  {type: String, required: true},
   lkw:  {type: String, required: true},
   drivingOffers: {type:[{ type: Schema.Types.ObjectId, ref: 'DrivingOffer' }],required: false },
   drivingRequests: {type:[{ type: Schema.Types.ObjectId, ref: 'DrivingRequest' }],required: false},
});

 */
describe('register user test', () => {
    it('should successfully add a user and delete it afterwards ', (done) => {
        let testUser = new User({
            username: 'jan123' ,
            password: 'test123',
            firstName: 'jan',
            lastName: 'Schneider',
            birthdate: '2019-01-04T23:00:00Z',
            phone: '123',
            mail: 'a@b.com',
            img:  'http://www.clipartmax.com/png/middle/11-115689_cars-2-clip-art-cartoon-car-side-view.png',
            bio: 'Ich bin Student an der THM',
            street: 'Hauptstraße',
            houseNumber: '2c',
            zip: '4353',
            city: 'Hamburg',
            pkw: 'true',
            transporter: 'true',
            lkw: 'true',
            drivingOffers: [],
            drivingRequests: [],
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
                expect(res.body[0]).to.have.property('firstName').eql('jan');
                expect(res.body[0]).to.have.property('lastName').eql('Schneider');
                User.findByIdAndDelete(res.body[0]._id,(err, user) =>{
                    if (err) return err;
                });
                done()
              })  
        })
    })
});
