const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { Dog, Temperament, conn } = require("../../src/db")

const agent = session(app)

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DB", err)
    })
  )

describe('/api/dogs', function() {
  it('GET respons with status 200', function(){
    return agent
      .get('/api/dogs')
      .expect(function(res){
        expect(res.status).equal(200)})
  }).timeout(10000)
  it('Elements received are Object type',  function() {
    return agent 
      .get('/api/dogs') 
      .expect(function(res) {
        expect(typeof res.body[0]).equal('object'); 
      });
  }).timeout(10000)
})
describe('/api/dogs?name=', function() {
  it('GET respons with status 200 with a name URL with mixed camel case', function() {
    return agent 
      .get('/api/dogs?name=TeRRiEr') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000)
  it('GET receives a body lenght larger if there is query coincidences',  function() {
    return agent 
      .get('/api/dogs?name=toy') 
      .expect(function(res) {
        expect(res.body.length).equal(5); 
      });
  }).timeout(3000)
})
describe('/:id', function() {
  it('GET responses with status 200 if a dog is found',  function() {
    return agent 
      .get('/api/dogs/13') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  xit('GET gets dog data by the :id as a parameter',  function() {
    return agent 
      .get('/api/dogs/13')
      .expect(function(res) {
        expect(res.body.name).equal('American Eskimo Dog (Miniature)'); 
      });
  }).timeout(10000)
})
describe('/temperament', function() {
  xit('GET sends status 200 when finding temperaments', function() {
    return agent 
      .get('/temperament') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  })
});