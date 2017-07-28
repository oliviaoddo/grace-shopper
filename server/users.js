'use strict'

/* TO DO:
 - consider admin access for all routes
*/

const {Review, User, Order, LineItem, Product} = require('APP/db')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) =>
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(next))
  // query to see non-admin users
  .get('/?isAdmin="false"', (req, res, next) =>
    User.findAll({where: {isAdmin: req.query.isAdmin}})
    .then(users => res.status(200).json(users))
    .catch(next))
  // query to see if user is admin
  .get('/?isAdmin="true"', (req, res, next) =>
    User.findAll({where: {isAdmin: req.query.isAdmin}})
    .then(users => res.status(200).json(users))
    .catch(next))
  // admin or actual user can view
  .get('/:id', (req, res, next) =>
    User.findById(req.params.id, {
      include: [Review]
    })
    .then(user => res.json(user))
    .catch(next))
  // cant create a new user with admin status
  .post('/', (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .put('/:id', (req, res, next) =>
    User.update(req.body, {where: {id: req.params.id}})
    .then(([count, user]) => res.json(user))
    .catch(next))
  // admin or actual user can view
  .delete('/:id', (req, res, next) =>
    User.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204)))

  // REVIEWS ROUTE

  .get('/:id/reviews', (req, res, next) =>
    Review.findAll({where: {userId: req.params.reviews}})
    .then(reviews => res.status(200).json(reviews))
    .catch(next))

  // ORDER ROUTES
  // list of users orders
  // specific user and admin access
  .get('/:id/orders', (req, res, next) =>
    Order.findAll({where: {userId: req.params.id}})
    .then(orders => res.status(200).json(orders))
    .catch(next))
  // single user order with line items
  // specific user and admin access
  .get('/:id/orders/:orderId', (req, res, next) =>
    Order.findById(req.params.orderId, {include: [LineItem]})
    .then(order => res.status(200).json(order))
    .catch(next))
  // only single user can create
  .post('/:id/orders', (req, res, next) =>
    Order.create(req.body)
    .then(order => res.status(202).json(order))
    .catch(next))
  .put('/:id/orders/:orderId', (req, res, next) => {
    Order.update(req.body, {where: {id: req.params.orderId}})
    .then(([count, order]) => res.json(order))
  .catch(next)
  })
  // LINEITEM ROUTES

  .post('/:id/product', (req, res, next) =>
    Promise.all([
      Order.findOne({
        where: {
          user_id: req.params.id,
          status: 'cart'
        }
      }),
      Product.findById(req.body.productId)
    ])
    .then(([order, product]) =>
      order.addProduct(product,
      {price: product.price, quantity: req.body.quantity}))
    .then(lineItem => res.status(202).json(lineItem))
    .catch(next))

  .put('/:id/product', (req, res, next) =>
    Promise.all([
      Order.findOne({
        where: {
          user_id: req.params.id,
          status: 'cart'
        }
      }),
      Product.findById(req.body.productId)
    ])
    .then(([order, product]) =>
      order.setProducts(product,
      {quantity: req.body.quantity}))
    .then(count =>
      res.status(202).json(count)
    )
    .catch(next))

  .delete('/:id/cart/product', (req, res, next) =>
    Promise.all([
      Order.findOne({
        where: {
          user_id: req.params.id,
          status: 'cart'
        }
      }),
      Product.findById(req.body.productId)
    ])
    .then(([order, product]) =>
      order.removeProduct(product))
    .then(res.sendStatus(204))
    .catch(next))
