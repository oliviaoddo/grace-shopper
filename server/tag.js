'use strict'

/* TO DO:
 - Add admin access to post and put delete
*/

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
  // admin only
  .post('/', (req, res, next) => {
    Tag.create(req.body)
    .then(tag => res.status(201).json(tag)
    .catch(next))
  })
  // admin only
  .put('/:id', (req, res, next) => {
    Tag.update(req.body, {where: {id: req.params.id}})
    .then(([count, tag]) => res.json(tag))
    .catch(next)
  })
  // admin only
  .delete('/:id', (req, res, next) => {
    Tag.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
  })
