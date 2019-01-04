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
    it('should successfully add a user and delete it afterwards ', (done) => {
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
        //console.log(testUser)
        chai.request(app_1.default)
            .post('/api/users/register')
            .send(testUser)
            .end((err, res) => {
            expect(res).to.have.status(200);
            //check if the data in the database match with the data which was send to the serverdocker run -p 27017:27017 --rm  -d --network node_server -v $PWD/database/data:/data/db --name nodeDatabase mongo:latest
            chai.request(app_1.default)
                .get('/api/users/')
                .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                //expect(res.body.length).to.be.eql(1)
                expect(res.body[0]).to.have.property('firstName').eql('Jan');
                expect(res.body[0]).to.have.property('lastName').eql('Schneider');
                User.findByIdAndDelete(res.body[0]._id, (err, user) => {
                    if (err)
                        return err;
                });
                done();
            });
        });
    });
});
//# sourceMappingURL=api_user_route_test.js.map