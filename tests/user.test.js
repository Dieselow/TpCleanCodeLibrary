let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
const User = require('../models/user');
const Book = require('../models/books');

// This agent refers to PORT where program is runninng.
describe('POST user and books ', () => {
    after((done) => {
        User.findOneAndRemove({login: "test"}, (err) => {
        });
        User.findOneAndRemove({login: "testAdmin"}, (err) => {
        });
        Book.findOneAndRemove({title: "test"}, (err) => {
        });
        done();
    });
    it('should create a user', (done) => {
        chai.request(server)
            .post('/user')
            .send({login: "test"})
            .end(function (err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should create and admin user', (done) => {
        chai.request(server)
            .post('/user')
            .send({login: "testAdmin", role: "LIBRARIAN"})
            .end(function (err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should create a book', function (done) {
        chai.request(server)
            .post('/books')
            .set({login: "testAdmin"})
            .send({title: "test", author: "LIBRARIAN"})
            .end(function (err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
});
