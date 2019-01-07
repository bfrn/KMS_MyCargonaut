"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
chai.use(chaiHttp);
const expect = chai.expect;
describe('test main route', () => {
    it('should return status-code 200', (done) => {
        chai.request(app_1.default)
            .get('/')
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=base_route_test.js.map