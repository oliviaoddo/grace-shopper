'use strict'

const {Product, Review, User, Category, Tag} = require('APP/db')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Product.findAll({include:
      [{model: Category}, {model: Tag}]})
    .then(products => res.json(products))
    .catch(next)
  })
  .get('/:id', (req, res, next) => {
    Product.findById(req.params.id,
      { include: [{model: Review,
        include: [{model: User}]}, {model: Category}, {model: Tag}]})
    .then(product => res.json(product))
    .catch(next)
  })
  .post('/', (req, res, next) => {
    Product.create(req.body)
    .then(product => res.json(product)
    .catch(next))
  })
  .put('/:id', (req, res, next) => {
    Product.update(req.body, {where: {id: req.params.id}})
    .then(product => res.json(product[1]))
    .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    Product.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(202))
  })
