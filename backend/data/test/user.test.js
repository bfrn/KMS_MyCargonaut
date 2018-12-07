process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let User = require('../models/user.model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../index')
let should =  chai.should()

chai.use(chaiHttp)

describe('Test the User API', ()=> {
    beforeEach((done) => {
        User.deleteMany({}, (err)=>{
            done()
        })
    })

    describe('\GET /user', ()=>{
        it('should GET all user, which leads to exactly 0 entrys', (done) => {
            chai.request(app)
                .get('/user')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })
    describe('\POST /user/register', ()=>{
        it('should create 3 users, which leads to exactly 3 entrys', (done) => {
            let user1 = {
                username: "simon",
                password: "123"
            }
            let user2 = {
                username: "björn",
                password: "456"
            }
            let user3 = {
                username: "paul",
                password: "789"
            }
            chai.request(app)
                .post('/user/register')
                .send(user1)
                .end((err, res) => {
                    res.body.should.have.property('success').eql('user successfully created')
                })
            setTimeout(1000);
            chai.request(app)
                .post('/user/register')
                .send(user2)
                .end((err, res) => {
                    res.body.should.have.property('success').eql('user successfully created')
                })
            setTimeout(1000);
            chai.request(app)
                .post('/user/register')
                .send(user3)
                .end((err, res) => {
                    res.body.should.have.property('success').eql('user successfully created')
                })
            setTimeout(1000);
            chai.request(app)
                .get('/user')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(3)
                    res.body[0].should.have.property('username').eql('simon')
                    res.body[0].should.have.property('password').eql('123')
                    res.body[1].should.have.property('username').eql('björn')
                    res.body[1].should.have.property('password').eql('456')
                    res.body[2].should.have.property('username').eql('paul')
                    res.body[2].should.have.property('password').eql('789')
                    done()
                })
        })
    })
    describe('\PUT /user/:id', ()=>{
        it('should update specified user to expected values', (done) => {
            let user1 = new User({
                username: "simon",
                password: "123"
            })
            user1.save((err, user) => {
                chai.request(app)
                    .put('/user/'+user.id)
                    .send({username: 'lee', password: '8888'})
                    .end((err, res) => {
                        res.body.should.have.property('success').eql('User successfully udpated')
                    })
                chai.request(app)
                    .get('/user')
                    .end((err, res) => {
                        res.body.should.be.a('array')
                        res.body.length.should.be.eql(1)
                        res.body[0].should.have.property('username').eql('lee')
                        res.body[0].should.have.property('password').eql('8888')
                        done()
                    })
            })
        })
    })
})


