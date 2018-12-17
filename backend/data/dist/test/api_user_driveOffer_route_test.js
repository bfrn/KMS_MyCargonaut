"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
const User = require('../src/models/user.model');
chai.use(chaiHttp);
const expect = chai.expect;
describe('create drive-offer', () => {
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
        });
        testUser.save((err, user) => {
            chai.request(app_1.default)
                .post('/api/users/' + user.id + '/drivingOffers/create')
                .send({
                date: '2014-08-15T22:00:00.000Z',
                origin: 'avc',
                destination: 'derf',
                restrictions: ['rede gerne', ' richte mich nach Mitfahreren'],
                preferences: ['rede gerne', ' richte mich nach Mitfahreren'],
                price: '25.90',
                hasFixedPrice: true,
                cargoWeightInKg: 445,
                loadingSpaceDimensions: [432, 534, 3324],
                personCnt: 32,
                stops: ['Fried', 'Bauheim', 'Lin']
            })
                .end((err, res) => {
                expect(res).to.have.status(200);
                //check if the data in the database match with the data which was send to the server
                chai.request(app_1.default)
                    .get('/api/users/' + user.id + '/drivingOffers')
                    .end((err, res) => {
                    expect(res.body.length).to.be.above(0);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=api_user_driveOffer_route_test.js.map