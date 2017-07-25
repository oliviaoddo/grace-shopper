'use strict'
const {Tag} = require('APP/db')
module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Tag.findAll()
    .then(tags => res.json(tags))
    .catch(next)
  })
  .get('/:id', (req, res, next) => {
    Tag.findById(req.params.id)
    .then(tag => res.json(tag))
    .catch(next)
  })
  .post('/', (req, res, next) => {
    Tag.create(req.body)
    .then(tag => res.json(tag)
    .catch(next))
  })
  .put('/:id', (req, res, next) => {
    Tag.update(req.body, {where: {id: req.params.id}})
    .then(tag => res.json(tag[1]))
  .catch(next)
  })
  .delete('/:id', (req, res, next) => {
    Tag.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(202))
  })
