"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
chai.use(chaiHttp);
const expect = chai.expect;
const User = require('../src/models/user.model');
const DrivingOffer = require('../src/models/drivingOffer.model');
describe('create drivinig-offer test', () => {
    it('create a user and a driving-offer for him', (done) => {
        let testUser = new User({
            username: 'jan123',
            password: 'test123',
            firstName: 'Jan',
            lastName: 'Schneider',
            bio: 'Ich bin Student an der THM',
            street: 'Hauptstraße',
            houseNumber: '2c',
            zip: '4353',
            city: 'Hamburg',
        });
        testUser.save((err, user) => {
            if (err)
                return err;
            testUser = user;
        });
        let testDrivingOffer = new DrivingOffer({
            date: '2014-08-15T22:00:00.000Z',
            origin: 'Hamburg',
            destination: 'Berlin',
            restrictions: ['bin Nichtraucher', 'ich mag keine Hamster'],
            preferences: ['rede gerne', ' richte mich nach Mitfahreren'],
            price: '25.90',
            hasFixedPrice: true,
            cargoWeightInKg: 445,
            loadingSpaceDimensions: [432, 534, 332],
            personCnt: 32,
            stops: ['Fried', 'Bauheim', 'Lin']
        });
        //console.log(testDrivingOffer)
        chai.request(app_1.default)
            .post('/api/users/' + testUser.id + '/drivingOffers')
            .send(testDrivingOffer)
            .end((err, res) => {
            expect(res).to.have.status(200);
            //check if the data in the database match with the data which was send to the server
            chai.request(app_1.default)
                .get('/api/users/' + testUser.id + '/drivingOffers')
                .end((err, res) => {
                //console.log(res.body)
                expect(res.body).to.be.a('array');
                //expect(res.body.length).to.be.eq(1)
                expect(res.body[0]).to.have.property('origin').eql('Hamburg');
                expect(res.body[0]).to.have.property('destination').eql('Berlin');
                User.findByIdAndDelete(testUser.id, (err, user) => {
                    //console.log(user)
                    if (err)
                        return err;
                });
                DrivingOffer.findByIdAndDelete(res.body[0]._id, (err, user) => {
                    if (err)
                        return err;
                });
                done();
            });
        });
    });
});
//# sourceMappingURL=api_user_drivingOffer_route_test.js.map