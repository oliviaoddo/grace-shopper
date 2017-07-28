'use strict'

const api = module.exports = require('express').Router()
const {mustBeLoggedIn} = require('APP/server/auth.filters.js')

api
  .get('/heartbeat', (req, res) => res.send({
    ok: true
  }))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/tags', require('./tag'))
  .use('/products', require('./products'))
  .use('/users', require('./users'))
  .use('/reviews', require('./reviews'))
  .use('/categories', require('./category'))
  .use('/orders', mustBeLoggedIn, require('./orders'))
  // No routes matched? 404.
api.use((req, res) => res.status(404).end())
