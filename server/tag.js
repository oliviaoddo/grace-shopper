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
  .post('/', (req, res, next) => { // who can do this? -- KHND
    Tag.create(req.body)
    .then(tag => res.json(tag) // look at parens here; it's a post I assume I would receive a 201 -- KHND
    .catch(next))
  })
  .put('/:id', (req, res, next) => {
    Tag.update(req.body, {where: {id: req.params.id}})
    .then(tag => res.json(tag[1])) // consider array destructuring or spread -- KHND
  .catch(next) // indentation -- KHND
  })
  .delete('/:id', (req, res, next) => { // who can do this?? -- KHND
    Tag.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(202)) // 204 -- no body -- KHND
  })
