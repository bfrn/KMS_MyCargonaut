import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as mongoose from 'mongoose'

chai.use(chaiHttp);

const expect = chai.expect;
const User = require('../src/models/user.model');
const DrivingOffer = require('../src/models/drivingOffer.model');
const DrivingRequest = require('../src/models/drivingRequest.model');
const Booking = require('../src/models/booking.model');


describe('create booking test', () => {
    it('create two user, a driving-offer and a driving request an then create a booking for them', (done) => {
        //setup
        let testUser1 = new User({
            username: 'jan123' ,
            password: 'test123',
            firstName: 'Jan',
            lastName: 'Schneider',
            birthdate: '2019-01-30T23:00:00Z',
            bio: 'Ich bin Student an der THM',
            street: 'Hauptstraße',
            img: 'testimage/image',
            houseNumber: '2c',
            zip: '4353',
            city: 'Hamburg',
            pkw: 'true',
            transporter: 'true',
            lkw: 'true',
          });

          let testUser2 = new User({
            username: 'dieter123' ,
            password: 'test123',
            firstName: 'Jan',
            lastName: 'Schneider',
            birthdate: '2019-01-30T23:00:00Z',
            bio: 'Ich bin Student an der THM',
            street: 'Hauptstraße',
            houseNumber: '2c',
            zip: '4353',
            city: 'Hamburg',
            pkw: 'true',
            transporter: 'true',
            lkw: 'true',
          });

        let testDrivingRequest = new DrivingRequest({
            date: '2014-08-15T22:00:00.000Z',
            origin: 'Hamburg',
            destination: 'Berlin',
            restrictions: ['bin Nichtraucher','ich mag keine Hamster'],
            preferences:  ['rede gerne',' richte mich nach Mitfahreren'],
            price: '25.90',
            hasFixedPrice: true,
            cargoWeightInKg: 445,
            loadingSpaceDimensions: [432, 534, 332],
            personCnt: 32,
            owner: testUser1.id,
        });
        testDrivingRequest.save((err, drivingRequest) => {
            if (err) return err;
            testDrivingRequest = drivingRequest
        });
        testUser1.drivingRequests.push(testDrivingRequest.id);
        testUser1.save((err, user) => {
            if (err) return err;
            testUser1 = user
        });

        let testDrivingOffer = new DrivingOffer({
            date: '2014-08-15T22:00:00.000Z',
            origin: 'Hamburg',
            destination: 'Berlin',
            restrictions: ['bin Nichtraucher','ich mag keine Hamster'],
            preferences:  ['rede gerne',' richte mich nach Mitfahreren'],
            price: '25.90',
            hasFixedPrice: true,
            cargoWeightInKg: 445,
            loadingSpaceDimensions: [432, 534, 332],
            personCnt: 32,
            owner: testUser2.id,
            stops: ['Fried','Bauheim','Lin'],
        });
        testDrivingOffer.save((err, drivingOffer) => {
            if (err) return err;
            testDrivingOffer = drivingOffer
        });
        testUser2.drivingOffers.push(testDrivingOffer.id);
        testUser2.save((err, user) => {
            if (err) return err;
            testUser2 = user
        });

        chai.request(app)
        .post('/api/bookings')
        .send({
            date: '2014-08-23T22:00:00.000Z',           
            costs: '25.90',
            paymentMethod: 'PayPal',
            drivingOfferId: testDrivingOffer.id,
            drivingRequestId: testDrivingRequest.id,

        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.costs).to.be.eql('25.90');
            expect(res.body.drivingRequest).to.be.eql(testDrivingRequest.id);
            expect(res.body.drivingOffer).to.be.eql(testDrivingOffer.id);
            User.findByIdAndDelete(testUser1.id,(err, user) =>{
                if (err) return err;
            });
            User.findByIdAndDelete(testUser2.id,(err, user) =>{
                if (err) return err;
            });
            DrivingRequest.findByIdAndDelete(testDrivingRequest.id,(err, drivingRequest) =>{
                if (err) return err;
                expect(res.body._id).to.be.eql(drivingRequest.booking.toString())
            });
            DrivingOffer.findByIdAndDelete(testDrivingOffer.id, (err, drivingOffer) =>{
                if (err) return err;
                expect(res.body._id).to.be.eql(drivingOffer.bookings[0].toString())
            });
            done()
        })

    })
});

