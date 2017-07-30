'use strict'

/* TO DO:
 - Add admin access to post put delete
*/

const {Product, Review, User, Category, Tag, Order, LineItem} = require('APP/db')

const {assertAdmin, mustBeLoggedIn} = require('APP/server/auth.filters.js')

module.exports = require('express').Router()
  // .get('/', (req, res, next) => {
  //   Product.findAll({
  //     include: [{model: Category}, {model: Tag}]
  //   })
  //   .then(products =>
  //     req.query.category
  //       ? products.filter((product) =>
  //         product.categories.find(category =>
  //           category.name === req.query.category))
  //       : products)
  //   .then(filteredProducts =>
  //     req.query.sort
  //       ? filteredProducts.sort((a, b) =>
  //         a[req.query.sort] + b[req.query.sort])
  //       : filteredProducts)
  //   .then(sortedProducts =>
  //     res.json(sortedProducts))
  //   .catch(next)
  // })

  // Another way of making the above request, might be faster
  // not sure why tag filter isnt working
  .get('/', (req, res, next) => {
    Product.findAll({
      include: [{model: Category}, {model: Tag}],
      where: {
        '$Category.name$': req.query.category,
        '$Tag.name$': req.query.tag
      }
    })
    .then(filteredProducts =>
      req.query.sort
        ? filteredProducts.sort((a, b) =>
          a[req.query.sort] - b[req.query.sort])
        : filteredProducts)
    .then(sortedProducts =>
      res.json(sortedProducts))
    .catch(next)
  })

  .get('/:id', (req, res, next) => {
    Product.findById(req.params.id,
      { include: [{model: Review,
        include: [{model: User}]}, {model: Category}, {model: Tag}]})
    .then(product => res.json(product))
    .catch(next)
  })
  //  only admins should be able to create products
  .post('/', mustBeLoggedIn, assertAdmin, (req, res, next) => {
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
  })
  //  only admins should be able to edit products
  // .put('/:id', (req, res, next) => {
  //   Product.update(req.body, {
  //     where: {
  //       id: req.params.id
  //     },
  //     returning: true,
  //     plain: true
  //   })
  // .then(([count, product]) => res.status(201).json(product))
  // .catch(next)
  // })

  .put('/:id', mustBeLoggedIn, assertAdmin, (req, res, next) => {
    Promise.all([
      Product.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      }),
      Order.findAll({
        where: {
          status: 'cart'
        },
      })
    ])
    .then(([[count, product], orders]) => {
      console.log('product', product)
      orders.forEach(order =>
        order.setProducts(product, {price: product.price}))
    })
    .then(() => res.sendStatus(201))
    .catch(next)
  })

  //  only admins should be able to delete products
  .delete('/:id', (req, res, next) => {
    Product.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(202))
  })

  // REVIEWS ROUTES

  .get('/:id/reviews', (req, res, next) =>
    Review.findAll({where: {productId: req.params.id}})
    .then(reviews => res.status(200).json(reviews))
    .catch(next))
  .get('/:id/reviews/:reviewId', (req, res, next) =>
    Review.findById(req.params.reviewId)
    .then(review => res.status(200).json(review))
    .catch(next))
  .post('/:id/reviews', (req, res, next) =>
    Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next))
  .put('/:id/reviews/:reviewId', (req, res, next) =>
    Review.update(req.body, {where: {id: req.params.reviewId}})
    .then(([count, review]) => res.json(review))
    .catch(next))
  .delete('/:id/reviews/:reviewId', (req, res, next) =>
    Review.delete({where: {id: req.params.reviewId}})
    .then(() => res.sendStatus(202))
    .catch(next))
