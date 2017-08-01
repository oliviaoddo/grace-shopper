'use strict'

const api = module.exports = require('express').Router()
const {mustBeLoggedIn, selfOnly} = require('APP/server/auth.filters.js')

api
  .get('/heartbeat', (req, res) => res.send({
    ok: true
  }))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/tags', require('./tag'))
  .use('/products?:category?:sort?:tag', require('./products'))
  .use('/users', require('./users'))
  .use('/reviews', require('./reviews'))
  .use('/categories', require('./category'))
  .use('/orders', mustBeLoggedIn, require('./orders'))
  .use('/users/:id/cart', mustBeLoggedIn, selfOnly, require('./cart'))
  // No routes matched? 404.
api.use((req, res) => res.status(404).end())
