'use strict'

const {
  Review,
  User
} = require('APP/db')

const {
  mustBeLoggedIn,
  forbidden
} = require('./auth.filters')

// 404 -- not found
// 401 -- unauthorized -- nobody has logged in -- tell user to log in
// 403 -- forbidden -- someone is logged AND still NO 

module.exports = require('express').Router()
  // /api/users?isAdmin="true"
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) => // should EVERYONE be able to see all users? no, just admin -- KHND
    User.findAll({where: {req.query}})
    .then(users => res.json(users))
    .catch(next))

.get('/admin', (req, res, next) => // filtering should make you think req.query -- KHND
  User.findAll({
    where: {
      isAdmin: true
    }
  })
  .then(users => res.json(users))
  .catch(next))

.post('/', // should ANYONE be allowed to post? -- KHND
    (req, res, next) =>
    User.create(req.body) // should anything be allowed to be created? -- KHND
    .then(user => res.status(201).json(user))

    .catch(next))
  .get('/:id',
    // mustBeLoggedIn, // consider adminOrSelf -- KHND
    (req, res, next) =>
    User.findById(req.params.id, {
      // include:[Review] -- KHND
      include: [{
        model: Review
      }]
    })
    .then(user => res.json(user))
    .catch(next))
