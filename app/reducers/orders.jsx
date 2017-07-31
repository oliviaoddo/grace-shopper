/* TO DO
  ask kate about organizing order routes
*/
import axios from 'axios'

// ACTION TYPE CONSTANT
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const EDIT_ORDER_STATUS = 'EDIT_ORDER_STATUS'
const GET_CART ='GET_CART'
const ADD_CART ='ADD_CART'
const DELETE_CART ='DELETE_CART'
const EDIT_CART = 'EDIT_CART'

// ACTION CREATORS

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const getOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

const getUserOrders = orders => {
  return {
    type: GET_USER_ORDERS,
    orders
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

export const fetchOrders = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => {
    dispatch(getOrders(orders))
  })

export const fetchOrder = (order) =>
  dispatch =>
  axios.get(`api/orders/${order.id}`)
  .then(res => res.data)
  .then(order => {
    dispatch(getOrder(order))
  })

export const fetchUserOrders = (user) =>
  dispatch =>
  axios.get(`/api/user/${user.id}/orders`)
  .then(res => res.data)
  .then(orders => {
    dispatch(getUserOrders(orders))
  })

export const updateOrderStatus = (user, order) =>
  dispatch =>
  axios.put(`/api/user/${user.id}/orders/${order.id}`)
  .then(res => res.data)
  .then(emptyCart => {
    dispatch(editOrderStatus(emptyCart))
  })

export const fetchCart = (cart, user) =>
  dispatch =>
  axios.post(`/api/users/${user.id}/cart`)
  .then(res => res.data)
  .then(cart => {
    dispatch(getCart(cart))
  })

export const postCart = (user, product) =>
  dispatch =>
  axios.post(`/api/user/${user.id}/product/`)
  .then(res => res.data)
  .then(product => {
    dispatch(addCart(product))
  })

export const updateCart = (user) =>
  dispatch =>
  axios.put(`/api/users/${user.id}/products`)
  .then((product) => {
    dispatch(editCart(product))
  })

export const removeCart = user =>
  dispatch =>
  axios.delete(`/api/user/${user.id}/product`)
  .then((product) => {
    dispatch(deleteCart(product))
  })

const initialState = {
  orders: [],
  singleOrder: {},
  cartProducts: [],
}

// REDUCER

export default function reducer(state=initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_ORDERS:
    newState.orders = action.orders
    break
  case GET_ORDER:
    newState.order = action.order
    break
  case GET_USER_ORDERS:
    newState.orders = action.orders
    break
  case EDIT_ORDER_STATUS:
    newState.order = newState.cartProducts = []
    break
  case GET_CART:
    newState.cartProduct = action.products
    state.map(product =>
      product.id === action.product.id ? action.product : product)
    break
  case ADD_CART:
    newState.cartProducts = newState.cartProducts.push(action.product)
    break
  case DELETE_CART:
    newState.cartProducts = newState.cartProducts.filter(product => product.id !== action.product.id)
    break
  case EDIT_CART:
    newState.cartProducts = newState.cartProducts.map(product =>
      product.id ===action.product.id ? action.product : product)
    break
  default:
    return state
  }
  return newState
}
