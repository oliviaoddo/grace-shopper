import axios from 'axios'

// ACTION TYPE CONSTANT

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

// ACTION CREATORS

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

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

const editProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

// THUNKS

export const fetchProducts = () =>
  dispatch =>
  axios.get('/api/products')
  .then(res => res.data)
  .then(products => {
    dispatch(getProducts(products))
  })

export const fetchProduct = (product) =>
  dispatch =>
  axios.get(`/api/products/${product.id}`)
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
