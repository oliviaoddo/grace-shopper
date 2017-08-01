/* TO DO
  ask kate about organizing order routes
*/
import axios from 'axios'

// ACTION TYPE CONSTANT
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ORDER = 'GET_ORDER'
const EDIT_ORDER_STATUS = 'EDIT_ORDER_STATUS'
const GET_CART ='GET_CART'
const ADD_CART ='ADD_CART'
const DELETE_CART ='DELETE_CART'
const EDIT_CART = 'EDIT_CART'

// ACTION CREATORS

const getAllOrders = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

const getOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

const editOrderStatus = order => {
  return {
    type: EDIT_ORDER_STATUS,
    order
  }
}

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const addCart = product => {
  return {
    type: ADD_CART,
    product
  }
}

const editCart = product => {
  return {
    type: EDIT_CART,
    product
  }
}

const deleteCart = product => {
  return {
    type: DELETE_CART,
    product
  }
}

// THUNKS

export const fetchAllOrders = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => {
    dispatch(getAllOrders(orders))
  })
  .catch(err => console.log('fetch orders error', err))

export const fetchOrder = (order) =>
  dispatch =>
  axios.get(`api/orders/${order.id}`)
  .then(res => res.data)
  .then(order => {
    dispatch(getOrder(order))
  })
  .catch(err => console.log('fetch order error', err))

export const fetchUserOrders = (user) =>
  dispatch =>
  axios.get(`/api/users/${user.id}/orders`)
  .then(res => res.data)
  .then(orders => {
    dispatch(getAllOrders(orders))
  })
  .catch(err => console.log('fetch users order error', err))

export const updateOrderStatus = (user, order) =>
  dispatch =>
  axios.put(`/api/users/${user.id}/orders/${order.id}`)
  .then(res => res.data)
  .then(emptyCart => {
    dispatch(editOrderStatus(emptyCart))
  })
  .catch(err => console.log('update order error', err))

export const fetchCart = (cart, user) =>
  dispatch =>
  axios.get(`/api/users/${user.id}/cart`)
  .then(res => res.data)
  .then(cart => {
    dispatch(getCart(cart))
  })
  .catch(err => console.log('fetch cart error', err))

export const postCart = (user, product) =>
  dispatch =>
  axios.post(`/api/users/${user.id}/cart/`)
  .then(res => res.data)
  .then(product => {
    dispatch(addCart(product))
  })
  .catch(err => console.log('post product in cart error', err))

export const updateCart = (user) =>
  dispatch =>
  axios.put(`/api/users/${user.id}/cart`)
  .then((product) => {
    dispatch(editCart(product))
  })
  .catch(err => console.log('update product from cart error', err))

export const removeCart = user =>
  dispatch =>
  axios.delete(`/api/users/${user.id}/cart`)
  .then((product) => {
    dispatch(deleteCart(product))
  })
  .catch(err => console.log('delete products from cart error', err))

const initialState = {
  orders: [],
  singleOrder: {},
  cart: {}
}

// REDUCER

export default function reducer(state=initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_ALL_ORDERS:
    newState.orders = action.orders
    break
  case GET_ORDER:
    newState.order = action.order
    break
  case EDIT_ORDER_STATUS:
    newState.orders.push(newState.cart)
    newState.cart = {}
    break
  case GET_CART:
    newState.cart = action.cart
    break
  case ADD_CART:
    newState.cart.products = newState.cart.products.push(action.product)
    break
  case DELETE_CART:
    newState.cart.products = newState.cart.products.filter(product => product.id !== action.product.id)
    break
  case EDIT_CART:
    newState.cart.product = newState.cart.product.map(product =>
      product.id ===action.product.id ? action.product : product)
    break
  default:
    return state
  }
  return newState
}
