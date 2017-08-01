import axios from 'axios'

//  STATE

const initialState = {
  products: [],
  product: {},
  topProducts: []
}

// ACTION TYPE CONSTANT

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const FETCH_TOP_RATED = 'FETCH_TOP_RATED'


// ACTION CREATORS

const getTopRated = products => {
  return {
    type: FETCH_TOP_RATED,
    products
  }
}


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

export const fetchTopRated = () =>
  dispatch =>
  axios.get('/api/products/topRated')
  .then(res => res.data)
  .then(products => {
    dispatch(getTopRated(products))
  })


export const fetchProducts = (ownProps) =>
  dispatch =>
  axios.get('/api/products' + ownProps)
  .then(res => res.data)
  .then(products => {
    dispatch(getProducts(products))
  })
  .catch(err => console.log('fetch all products error', err))

export const fetchProduct = (productId) =>
  dispatch =>
    axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      dispatch(getProduct(product))
    })
    .catch(err => console.log('fetch product error', err))

export const postProduct = product =>
  dispatch =>
    axios.post('/api/products', product)
    .then(res => res.data)
    .then(newProduct => {
      dispatch(addProduct(newProduct))
    })
    .catch(err => console.log('post products error', err))

export const deleteProduct = productId =>
  dispatch =>
    axios.delete(`/api/products/${productId}`)
    .then(res => res.data)
    .then((product) => {
      dispatch(removeProduct(product))
    })
    .catch(err => console.log('delete products error', err))

export const updateProduct = (product, productId) =>
  dispatch =>
    axios.put(`/api/products/edit/${productId}`, product)
    .then(res => res.data)
    .then(updatedProduct => {
      dispatch(editProduct(updatedProduct))
    })
    .catch(err => console.log('update products error', err))


// REDUCER

export default function reducer(state=initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_PRODUCTS:
    newState.products = action.products
    break
  case GET_PRODUCT:
    newState.product = action.product
    break
  case ADD_PRODUCT:
    newState.products = [...newState.products, action.product]
    break
  case REMOVE_PRODUCT:
    newState.products = newState.products.filter(product => {
      if (product.id !== action.product.id) return product
    })
    break
  case EDIT_PRODUCT:
    newState.products = newState.products.map(product =>
      product.id === action.product.id ? action.product : product
    )
    break
  case FETCH_TOP_RATED:
    newState.topProducts = action.products
    break
  default:
    return state
  }
  return newState
}
