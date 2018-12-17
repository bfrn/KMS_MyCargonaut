"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
const User = require('../src/models/user.model');
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
        });
        chai.request(app_1.default)
            .post('/api/users/register')
            .send(testUser)
            .end((err, res) => {
            expect(res).to.have.status(200);
            //check if the data in the database match with the data which was send to the server
            chai.request(app_1.default)
                .get('/api/users/')
                .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eql(1);
                expect(res.body[0]).to.have.property('firstName').eql('Jan');
                expect(res.body[0]).to.have.property('lastName').eql('Schneider');
                console.log(res.body[0]._id);
                User.findByIdAndDelete(res.body[0]._id, (err, user) => {
                    if (err) {
                        return err;
                    }
                });
                done();
            });
        });
    });
});
//# sourceMappingURL=api_user_route_test.js.map