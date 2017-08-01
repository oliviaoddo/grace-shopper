/* TO DO
  ask kate about organizing order routes
*/
import axios from 'axios'

// ACTION TYPE CONSTANT
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ORDER = 'GET_ORDER'
const EDIT_ORDER_STATUS = 'EDIT_ORDER_STATUS'

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

const initialState = {
  orders: [],
  singleOrder: {}
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
  default:
    return state
  }
  return newState
}
