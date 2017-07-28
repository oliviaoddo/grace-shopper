'use strict'

// all of these are in users not really necessary
const {Product, Review, User, Category, Tag, Order, Address, LineItem} = require('APP/db')
const Promise = require('bluebird')

module.exports = require('express').Router()
  // get the user's cart
  /*  when a user logs in, get an existing cart or create an empty one */
  .get('/user/:userId', (req, res, next) => {
    Order.findOrCreate({where:
    {userId: req.params.userId,
      status: 'cart'},
      include: [{model: LineItem, include: [{model: Product}]}]
    })
    .then(order => res.json(order))
    .catch(next)
  })
  // save the user's cart
  /*  if someone logs out we need to save the local storage cart */
  .post('/', (req, res, next) => {
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
  .put('/:id', (req, res, next) => {
    Order.update(req.body, {where: {id: req.params.id}})
    .then(order => res.json(order[1]))
  .catch(next)
  })
