'use strict'
const {Product, Review, User} = require('APP/db')
module.exports = require('express').Router()
// single review
  .get('/:id', (req, res, next) => {
    Review.findById(req.params.id)
    .then(review => res.status(200).json(review))
    .catch(next)
  })
// all reviews associated with a product
  .get('/product/:productId', (req, res, next) => {
    Review.findAll({where: {productId: req.params.productId}},
      {include: [{model: Review}, {model: User}]})
    .then(reviews => res.json(reviews))
    .catch(next)
  })
// add a review to a specific product
  .post('/product/:productId', (req, res, next) => {
    Review.create(req.body)
    .then(review => res.json(review)
    .catch(next))
  })
// edit a single review
  .put('/:id', (req, res, next) => {
    Review.update(req.body, {where: {id: req.params.id}})
    .then(review => res.json(review[1]))
  .catch(next)
  })
// delete a single review
  .delete('/:id', (req, res, next) => {
    Review.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(202))
  })
