import { combineReducers } from 'redux'
import products from './products'
import categories from './categories'
// import orders from './orders'
import reviews from './reviews'
import tags from './tags'
import users from './users'
import auth from './auth'

export default combineReducers({ products, categories, reviews, tags, users, auth })
