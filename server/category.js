'use strict'
const {Category} = require('APP/db')
module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
  })
  .get('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(next)
  })
  .post('/', (req, res, next) => {
    Category.create(req.body)
    .then(category => res.json(category)
    .catch(next))
  })
  .put('/:id', (req, res, next) => {
    Category.update(req.body, {where: {id: req.params.id}})
    .then(category => res.json(category[1]))
  .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    Category.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(202))
  })
