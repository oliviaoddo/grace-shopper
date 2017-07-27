'use strict'
const {Product, Review, User, Category, Tag, Order, Address, LineItem} = require('APP/db')
module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    //  userid, status=cart
    LineItem.Create(req.body)
    .then(lineItem => res.json(lineItem)
    .catch(next))
  })
  .put('/:id', (req, res, next) => {
    //  if status is pending, update the inventory
    LineItem.update(req.body, {where: {id: req.params.id}})
    .then(([count, lineItem]) => res.json(lineItem))
    .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    LineItem.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
  })
