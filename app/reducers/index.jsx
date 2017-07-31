import { combineReducers } from 'redux'
import products from './products'
import reviews from './reviews'
import auth from './auth'

export default combineReducers({ reviews, products, auth })
