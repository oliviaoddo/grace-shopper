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
//Maybe get all orders -NDKH

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
//Can do both user_orders and get_orders in one but having both is totally fine - NDKH

const editOrderStatus = order => {
  return {
    type: EDIT_ORDER_STATUS,
    //Maybe just EDIT_ORDER - NDKH
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

//Use catches! - NDKH

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

//fetchOrder and fetchUserOrders CAN call same action creator but doesn't have to - NDKH

export const updateOrderStatus = (user, order) =>
  dispatch =>
  axios.put(`/api/user/${user.id}/orders/${order.id}`)
    //Supposed to be users? -  NDKH
  .then(res => res.data)
  .then(emptyCart => {
    dispatch(editOrderStatus(emptyCart))
  })

export const fetchCart = (cart, user) =>
  dispatch =>
  axios.post(`/api/users/${user.id}/cart`) //should be a get - NDKH
  .then(res => res.data)
  .then(cart => {
    dispatch(getCart(cart))
  })

export const postCart = (user, product) =>
  dispatch =>
  axios.post(`/api/user/${user.id}/product/`)
  //Users or User / Product or Products? - NDKH
  .then(res => res.data)
  .then(product => {
    dispatch(addCart(product))
  })

export const updateCart = (user) =>
  dispatch =>
  axios.put(`/api/users/${user.id}/products`)
  //Might be a put to users/cart - NDKH
  .then((product) => {
    dispatch(editCart(product))
  })

export const removeCart = user =>
//if deleting a cart look at order users/order - NDKH
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
    //Can be in the same action creator as GET_ORDERS - NDKH
    break
  case EDIT_ORDER_STATUS:
    newState.order = newState.cartProducts = []
    //Make sure to update orders that are exported,
    break
  case GET_CART: //A cart is an order so it's going to be an object coming in, you can leave it as an object that has products on it - NDKH
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
