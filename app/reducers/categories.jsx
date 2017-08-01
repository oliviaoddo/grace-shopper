import axios from 'axios'

// ACTION TYPE CONSTANT

const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORY = 'GET_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'
const EDIT_CATEGORY = 'EDIT_CATEGORY'

// ACTION CREATORS

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

const getCategory = category => {
  return {
    type: GET_CATEGORY,
    category
  }
}

const addCategory = category => {
  return {
    type: ADD_CATEGORY,
    category
  }
}

const removeCategory = category => {
  return {
    type: REMOVE_CATEGORY,
    category
  }
}

const editCategory = category => {
  return {
    type: EDIT_CATEGORY,
    category
  }
}

// THUNKS

export const fetchCategories = () =>
  dispatch =>
  axios.get('/api/categories')
  .then(res => res.data)
  .then(categories => {
    dispatch(getCategories(categories))
  })
  .catch(err => console.log('fetch categories error', err))

export const fetchCategory = (category) =>
  dispatch =>
  axios.get(`/api/categories/${category.id}`)
  .then(res => res.data)
  .then(category => {
    dispatch(getCategory(category))
  })
  .catch(err => console.log('fetch Category error', err))

export const postCategory = category =>
  dispatch =>
  axios.post('/api/categories', category)
  .then(res => res.data)
  .then(newCategory => {
    dispatch(addCategory(newCategory))
  })
  .catch(err => console.log('post category error', err))

export const deleteCategory = category =>
  dispatch =>
  axios.delete(`/api/categories/${category.id}`)
  .then(() => {
    dispatch(removeCategory(category))
  })
  .catch(err => console.log('delete category error', err))

export const updateCategory = category =>
  dispatch =>
  axios.put(`/api/categories/${category.id}`, category)
  .then(() => {
    dispatch(editCategory(category))
  })
  .catch(err => console.log('update category error', err))

// REDUCER

export default function reducer(state=[], action) {
  switch (action.type) {
  case GET_CATEGORIES:
    return (action.categories)
  case GET_CATEGORY:
    return (action.category)
  case ADD_CATEGORY:
    return [...state, action.category]
  case REMOVE_CATEGORY:
    return state.filter(category => category.id !== action.category.id)
  case EDIT_CATEGORY:
    return state.map(category =>
      category.id === action.category.id ? action.category : category
    )
  default:
    return state
  }
}
