'use strict'
const {Product, Review, User, Category, Tag, Order, Address, LineItem} = require('APP/db')
module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Order.findAll({include: // consider shorthand -- KHND
    [{model: User}]})
    .then(orders => res.json(orders))
    .catch(next)
  })
  .get('/:id', (req, res, next) => {
    Order.findById(req.params.id, // this should be searching lineItems table -- KHND
      { include: [{model: User,
        include: [{model: Address}]}, {model: Product}]})
    .then(order => res.json(order))
    .catch(next)
  })
  .post('/', (req, res, next) => {
    //  userid, status=cart
    Order.findOrCreate(req.body.orderId) // lineItem -- KHND
    .then(order => res.json(order)
    .catch(next))
  })
  .put('/:id', (req, res, next) => {
    //  if status is pending, update the inventory
    Product.update(req.body, {where: {id: req.params.id}})
    .then(product => res.json(product[1]))
  .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    Product.destroy({where: {id: req.params.id}}) // lineItem -- KHND
    .then(() => res.sendStatus(202))
  })
