'use strict'

/* TO DO:
 - consider admin access for all routes
 need to use OAuth for query
*/

const {Review, User, Order, LineItem, Product} = require('APP/db')

const {mustBeLoggedIn, forbidden, selfOnly, assertAdmin, assertAdminOrSelfForUser} = require('APP/server/auth.filters.js')

module.exports = require('express').Router()
  .get('/', assertAdmin,
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
  .get('/?isAdmin="false"', assertAdmin, (req, res, next) =>
    User.findAll({where: {isAdmin: req.query.isAdmin}})
    .then(users => res.status(200).json(users))
    .catch(next))
  // query to see if user is admin
  .get('/?isAdmin="true"', assertAdmin, (req, res, next) =>
    User.findAll({where: {isAdmin: req.query.isAdmin}})
    .then(users => res.status(200).json(users))
    .catch(next))
  // admin or actual user can view
  .get('/:id', selfOnly, (req, res, next) =>
    User.findById(req.params.id, {
      include: [Review]
    })
    .then(user => res.json(user))
    .catch(next))
  // cant create a new user with admin status
  .post('/', (req, res, next) =>
      User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password})
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
  // changing order status from cart to pending, creating new cart
  .put('/:id/orders/:orderId', (req, res, next) => {
    Order.update({status: 'pending', checkoutDateTime: Date()}, {where: {id: req.params.orderId}})
    .then(() => Order.create({status: 'cart', userId: req.params.id}))
    .then((order) => res.status(202).json(order))
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
