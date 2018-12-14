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

    describe('\GET /api/users', ()=>{
        it('should GET all user, which leads to exactly 0 entrys', (done) => {
            chai.request(app)
                .get('/api/users/users')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })
    describe('\GET /api/users/:id', ()=>{
        it('should Get specified user', (done) => {
            let user1 = new User({
                username: "simon",
                password: "123"
            })
            user1.save((err, user) => {
                chai.request(app)
                    .get('/api/users/'+user.id)
                    .end((err,res)=>{
                        res.body.should.have.property('username').eql('simon')
                        res.body.should.have.property('password').eql('123')
                        done()
                    })
            })
        })
    })
    describe('\POST /api/users/register', ()=>{
        it('should create 1 user, which leads to exactly 1 entry with correct properties', (done) => {
            let user1 = {
                username: "simon",
                password: "123"
            }
            chai.request(app)
                .post('/api/users/register')
                .send(user1)
                .end((err, res) => {
                    res.body.should.have.property('success').eql('user successfully created')
                    chai.request(app)
                        .get('/api/users')
                        .end((err, res) => {
                            res.body.should.be.a('array')
                            res.body.length.should.be.eql(1)
                            res.body[0].should.have.property('username').eql('simon')
                            res.body[0].should.have.property('password').eql('123')
                            done()
                        })
                })
        })
    })
    describe('\PUT /api/users/:id', ()=>{
        it('should update specified user to expected values', (done) => {
            let user1 = new User({
                username: "simon",
                password: "123"
            })
            user1.save((err, user) => {
                chai.request(app)
                    .put('/api/users/'+user.id)
                    .send({username: 'lee', password: '8888'})
                    .end((err, res) => {
                        res.body.should.have.property('success').eql('user successfully udpated')
                        chai.request(app)
                            .get('/api/users')
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
    describe('\DELETE /api/users/:id', ()=>{
        it('should delete user which is specified by id', (done) =>{
            let user1 = new User({
                username: "simon",
                password: "123"
            })
            user1.save((err, user)=>{
                chai.request(app)
                    .delete('/api/users/'+user.id)
                    .end((err,res) => {
                        res.body.should.have.property('success').eql('user successfully deleted')
                        done()
                    })
            })
        })
    })
})


