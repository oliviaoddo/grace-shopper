/* TO DO
  ask kate about organizing order routes
*/


import axios from 'axios'

// ACTION TYPE CONSTANT

const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'

// ACTION CREATORS

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const getOrder = order => {
  return {
    type: GET_ORDERS,
    order
  }
}

const editOrder = order => {
  return {
    type: EDIT_ORDER,
    order
  }
}

// THUNKS

export const fetchOrderss = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => {
    dispatch(getOrders(orders))
  })

export const fetchOrder = (order) =>
  dispatch =>
  .then(res => res.data)
  .then(product => {
    dispatch(getProduct(product))
  })

export const postProduct = product =>
  dispatch =>
  axios.post('/api/products', product)
  .then(res => res.data)
  .then(newProduct => {
    dispatch(addProduct(newProduct))
  })

export const deleteProduct = product =>
  dispatch =>
  axios.delete(`/api/products/${product.id}`)
  .then(() => {
    dispatch(removeProduct(product))
  })

export const updateProduct = product =>
  dispatch =>
  axios.put(`/api/products/${product.id}`, product)
  .then(() => {
    dispatch(editProduct(product))
  })

// REDUCER

export default function reducer(state=[], action) {
  switch (action.type) {
  case GET_PRODUCTS:
    return (action.products)
  case GET_PRODUCT:
    return (action.product)
  case ADD_PRODUCT:
    return [...state, action.product]
  case REMOVE_PRODUCT:
    return state.filter(product => product.id !== action.product.id)
  case EDIT_PRODUCT:
    return state.map(product =>
      product.id === action.product.id ? action.product : product
    )
  default:
    return state
  }
}
