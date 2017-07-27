'use strict'
const {Product, Review, User, Category, Tag, Order, Address, LineItem} = require('APP/db')
const Promise = require('bluebird')

module.exports = require('express').Router()
  //  fetch all of the orders for admin order list view, make sure the user requesting this is an admin
  .get('/', (req, res, next) => {
    Order.findAll({include:
    [{model: User}]})
    .then(orders => res.json(orders))
    .catch(next)
  })
  //  get a single order to display on the admin single order view and user single order view
  .get('/:id', (req, res, next) => {
    Order.findById(req.params.id,
      { include: [{model: User,
        include: [{model: Address}]}, {model: LineItem}]})
    .then(order => res.json(order))
    .catch(next)
  })
  //  update the status of the order
  .put('/:id', (req, res, next) => {
    Order.update(req.body, {where: {id: req.params.id}})
    .then(([count, order]) => res.json(order))
  .catch(next)
  })
