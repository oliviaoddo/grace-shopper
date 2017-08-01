const request = require('supertest')
const {expect} = require('chai')
const db = require('APP/db'), {User} = db
const app = require('../server/start')

/* global describe it before afterEach beforeEach */
describe('/api/products', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET /', () => {
    it('gets all products when not provided a query string', () => {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect(res.body.length).to.equal(34)
    })

  })

})
