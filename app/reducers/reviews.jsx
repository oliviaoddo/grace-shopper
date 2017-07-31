import axios from 'axios'

//  STATE

const initialState = {
  reviews: []
}

// ACTION TYPE CONSTANT

const GET_REVIEWS = 'GET_REVIEWS'
const GET_REVIEW = 'GET_REVIEW'
const ADD_REVIEW = 'ADD_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'

// ACTION CREATORS

const getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

const getReview = review => {
  return {
    type: GET_REVIEW,
    review
  }
}

const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  }
}

const removeReview = review => {
  return {
    type: REMOVE_REVIEW,
    review
  }
}

const editReview = review => {
  return {
    type: EDIT_REVIEW,
    review
  }
}

// THUNKS

/*
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

*/

// all reviews associated with a product
export const fetchReviews = (productId) =>
  dispatch =>
  axios.get(`/api/reviews/product/${productId}`)
  .then(res => res.data)
  .then(reviews => {
    dispatch(getReviews(reviews))
  })

// single review
export const fetchReview = (reviewId) =>
  dispatch => {
    return axios.get(`/api/reviews/${reviewId}`)
    .then(res => res.data)
    .then(review => {
      dispatch(getReview(review))
    })
  }

// add a review to a specific product
export const postReview = (review, productId) =>
  dispatch => {
    console.log(review)
    return axios.post(`/api/reviews/product/${productId}`, review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(addReview(newReview))
      })
  }

export const deleteReview = reviewId =>
  dispatch => {
    return axios.delete(`/api/reviews/${reviewId}`)
    .then(res => res.data)
    .then((review) => {
      dispatch(removeReview(review))
    })
  }

export const updateReview = (review, reviewId) => dispatch => {
  console.log(review)
  return axios.put(`/api/reviews/${reviewId}`, review)
    .then(res => res.data)
    .then(updatedReview => {
      dispatch(editReview(updatedReview))
    })
}

// REDUCER

export default function reducer(state=initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_REVIEWS:
    newState.reviews = action.reviews
    break
  case GET_REVIEW:
    newState.review = action.review
    break
  case ADD_REVIEW:
    newState.reviews = [...newState.reviews, action.review]
    break
  case REMOVE_REVIEW:
    newState.reviews = newState.reviews.filter(review => {
      if (review.id !== action.review.id) return review
    })
    break
  case EDIT_REVIEW:
    newState.reviews = newState.reviews.map(review =>
      review.id === action.review.id ? action.review : review
    )
    break
  default:
    return state
  }
  return newState
}
