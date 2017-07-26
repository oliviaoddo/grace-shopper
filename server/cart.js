'use strict'
const {Product, Review, User, Category, Tag, Order, Address, LineItem} = require('APP/db')
const Promise = require('bluebird')

module.exports = require('express').Router() // confused why we have cart and orders because you only have orders that are pending
  // get the user's cart
  /*  when a user logs in, get an existing cart or create an empty one */
  .get('/:userId', (req, res, next) => { // consider `/user/:userId`
    Order.findOrCreate({where: // consider findOne if you have a hook when creating users. With findOne sometimes if nothing matches it will send the first order -- KHND
    {userId: req.params.userId,
      status: 'cart'},
      include: [{model: LineItem, include: [{model: Product}]}] // defaultscope in the lineItem to include products -- KHND
    })
    .then(order => res.json(order))
    .catch(next)
  })
  // save the user's cart
  /*  if someone logs out we need to save the local storage cart */
  .post('/', (req, res, next) => { // consider posting to DB if user logged in. Otherwise, use your best judgment for 1 user on multiple devices -- KHND
    // consider using session only when not logged in -- KHND
    // consider situation where you log in with session cart and already have cart in the DB -- KHND
    Order.findById(req.body.userId, {where: {status: 'cart'}})
    .then(order => {
      Promise.map(req.body.products, product => {
        LineItem.findOrCreate({where: {orderId: order.id, productId: product.id}, defaults: {quantity: product.quantity, price: product.price}})
        .spread((lineItem, created) => {
          if (!created) lineItem.update(product)
        })
        .catch(err => {
          console.log('error inside spread')
          return next(err)
        })
      })
      .catch(err => {
        console.log('error inside map')
        return next(err)
      })
    })
    .catch(err => {
      console.log('error inside order findById')
      return next(err)
    })
    Order.findOrCreate({where: {id: req.body.userId, status: 'cart'}})
    .spread((order, created) => {
      order.update()
    })
    .catch(next)
  })
  // if the user checks out with their local storage cart
  // call the post for persisting the cart
  // put date on the order, change status to pending, create a new cart
  .put('/:id', (req, res, next) => { // sometimes for updating cart itself, sometimes for changing to made order -- if changing to made order add field of dateTime = date.now() -- KHND
    Order.update(req.body, {where: {id: req.params.id}})
    .then(order => res.json(order[1]))
  .catch(next) // indent me!! -KHND
  })
