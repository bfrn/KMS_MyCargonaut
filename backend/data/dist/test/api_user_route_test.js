"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
chai.use(chaiHttp);
const expect = chai.expect;
describe('register user test', () => {
    it('should return status-code 200', (done) => {
        chai.request(app_1.default)
            .post('/api/users/register')
            .send({
            email: 'marcuwe@webmail.de',
            password: 'test123',
            firstName: 'marc-uwe',
            lastName: 'Kling',
            birthdate: '1982-08-15T22:00:00.000Z',
            bio: 'Ich bin eine Kleinkünstler aus Berlin',
            street: 'Hauptstraße',
            houseNumber: '1a',
            zip: '100115',
            city: 'Berlin',
        })
            .end((err, res) => {
            expect(res).to.have.status(200);
            //check if the data in the database match with the data which was send to the server
            chai.request(app_1.default)
                .get('/api/users')
                .end((err, res) => {
                expect(res.body.length).to.be.above(0);
                done();
            });
        });
    });
});
//# sourceMappingURL=api_user_route_test.js.map