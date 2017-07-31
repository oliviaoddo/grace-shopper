import axios from 'axios'

// ACTION TYPE CONSTANT

const GET_TAGS = 'GET_TAGS'
const GET_TAG = 'GET_TAG'
const ADD_TAG = 'ADD_TAG'
const REMOVE_TAG = 'REMOVE_TAG'
const EDIT_TAG = 'EDIT_TAG'

// ACTION CREATORS

const getTags = tags => {
  return {
    type: GET_TAGS,
    tags
  }
}

const getTag = tag => {
  return {
    type: GET_TAG,
    tag
  }
}

const addTag = tag => {
  return {
    type: ADD_TAG,
    tag
  }
}

const removeTag = tag => {
  return {
    type: REMOVE_TAG,
    tag
  }
}

const editTag = tag => {
  return {
    type: EDIT_TAG,
    tag
  }
}

// THUNKS

export const fetchTags = () =>
  dispatch =>
  axios.get('/api/tags')
  .then(res => res.data)
  .then(tags => {
    dispatch(getTags(tags))
  })

export const fetchTag = (tag) =>
  dispatch =>
  axios.get(`/api/tags/${tag.id}`)
  .then(res => res.data)
  .then(tag => {
    dispatch(getTag(tag))
  })

export const postTag = tag =>
  dispatch =>
  axios.post('/api/tags', tag)
  .then(res => res.data)
  .then(newTag => {
    dispatch(addTag(newTag))
  })

export const deleteTag = tag =>
  dispatch =>
  axios.delete(`/api/tags/${tag.id}`)
  .then(() => {
    dispatch(removeTag(tag))
  })

export const updateTags = tags =>
  dispatch =>
  axios.put(`/api/tags/${tags.id}`, tags)
  .then(() => {
    dispatch(editTag(tags))
  })

// REDUCER

export default function reducer(state=[], action) {
  switch (action.type) {
  case GET_TAGS:
    return (action.categories)
  case GET_TAG:
    return (action.tag)
  case ADD_TAG:
    return [...state, action.tag]
  case REMOVE_TAG:
    return state.filter(tag => tag.id !== action.tag.id)
  case EDIT_TAG:
    return state.map(tag =>
      tag.id === action.tag.id ? action.tag : tag
    )
  default:
    return state
  }
}
