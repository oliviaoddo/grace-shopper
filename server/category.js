'use strict'

/* TO DO:
 - Add admin access to post and put delete
*/

const {Category} = require('APP/db')
module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Category.findAll()
    .then(categories => res.status(200).json(categories))
    .catch(next)
  })
  .get('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => res.status(200).json(category))
    .catch(next)
  })
  // admin only
  .post('/', (req, res, next) => {
    Category.create(req.body)
    .then(category => res.status(201).json(category)
    .catch(next))
  })
  // admin only
  .put('/:id', (req, res, next) => {
    Category.update(req.body, {where: {id: req.params.id}})
    .then(([count, category]) => res.json(category))
    .catch(next)
  })
  // admin only
  .delete('/:id', (req, res, next) => {
    Category.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
  })
