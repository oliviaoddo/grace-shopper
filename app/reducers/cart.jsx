import axios from 'axios'

//  STATE

const initialState = {
  items: []
}


// ACTION TYPE CONSTANT

const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// ACTION CREATORS
const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const removeProduct = product => {
  return {
    type: REMOVE_PRODUCT,
    product
  }
}

const updateItem = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

// THUNKS

export const addProductToCart = (productId, quantity) =>
  dispatch => {
    return axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      product.quantity = quantity
      dispatch(addProduct(product))
    })
}

export const fetchCartItems = () =>
  dispatch => {
    let cartValue = sessionStorage.getItem('cart')
    let cart = JSON.parse(cartValue)
    Promise.all([
    Object.keys(cart).forEach(itemId => {
        axios.get(`/api/products/${itemId}`)
        .then(res => res.data)
        .then(product => {
          product.quantity = cart[itemId]
          dispatch(addProduct(product))
        })
    })
    ])
}


export const deleteProduct = product =>
  dispatch => {
    dispatch(removeProduct(product))
}


export const updateProduct = (product, quantity) =>
  dispatch => {
    product[0].quantity = quantity
    dispatch(updateItem(product))
}


// REDUCER

export default function reducer(state=initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case ADD_PRODUCT:
    newState.items = [...newState.items, action.product]
    break
  case REMOVE_PRODUCT:
    newState.items = newState.items.filter(item => {
      if(item.id !== action.product[0].id) return item;
    })
    break
 case UPDATE_PRODUCT:
    newState.items = newState.items.map(item =>
      item.id === action.product[0].id ? action.product[0] : item
    )
  default:
    return state
  }
  return newState
}
