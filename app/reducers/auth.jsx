import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (email, password, ownProps) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {email, password})
      .then(() => {
        dispatch(whoami())
        ownProps.history.push('/shop')
      })
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => {
        dispatch(whoami())
        window.location.replace('/')
      })
      .catch(() => dispatch(whoami()))

export const signup = (user,ownProps) => dispatch =>
     axios.post('/api/users', user)
      .then(() => {
        dispatch(whoami())
        ownProps.history.push('/shop')
      })
      .catch(() => dispatch(whoami()))


export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
