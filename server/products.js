'use strict'
const {resolve} = require('path')
const multer = require('multer')
/* TO DO:
 - Add admin access to post put delete
*/

const storage = multer.diskStorage({
  destination: resolve(__dirname, '../public', 'images'),
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

let upload = multer({ storage: storage })

const {Product, Review, User, Category, Tag, Order, LineItem} = require('APP/db')
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
  //  only admins should be able to create products
  .post('/', upload.array('images'), (req, res, next) => {
    console.log(req.files)
    console.log(req.body.categories)
    const imageFiles = req.files.map(file => {
      return '/images/' + file.filename
    })
    Product.create({SKU: req.body.SKU, name: req.body.name, price: req.body.price, description: req.body.description, inventory: req.body.inventory, images: imageFiles})
    .then(product => {
      Category.findById(1)
      .then(category => {
        product.addCategory(category)
      })
      console.log(product)
      res.status(201).json(product)
    })
    .catch(next)
  })
   // only admins should be able to edit products
  .put('/edit/:id', (req, res, next) => {
    console.log(req.body)
    Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
  .then(([count, product]) => res.status(201).json(product))
  .catch(next)
  })

  .put('/:id', (req, res, next) => {
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
    Product.findById(req.params.id)
    .then(product => {
      product.destroy()
      .then(() => {
        res.status(202).json(product)
      })
      .catch(next)
    })
    .catch(next)
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
