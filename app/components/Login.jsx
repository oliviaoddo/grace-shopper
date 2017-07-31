import React from 'react'

export const Login = ({ login }) => (
  <div className="loginContainer container center">
    <div className="row">
      <form onSubmit={function(evt) { evt.preventDefault(); login(evt.target.username.value, evt.target.password.value) } } className="col s12">
        <div className="row">
          <div id="loginUsername" className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" name="username" type="text" className="validate" />
            <label for="icon_prefix">Username</label>
          </div>
          <div id="loginPassword" className="input-field col s6">
            <i className="material-icons prefix">lock_outline</i>
            <input id="icon_telephone" name="password" type="text" className="validate" />
            <label for="icon_telephone">Password</label>
          </div>
        </div>
        <div className="row">
          <button className="btn waves-effect waves-light" type="submit" name="action" value="Login">Login
            <i className="material-icons right">lock_open</i>
          </button>
        </div>
      </form>
    </div>
  </div>
)
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
