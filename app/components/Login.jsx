import React from 'react'

export const Login = ({ login }) => (
  <div className="login-box">
    <div className="lb-header">
      <a href="#" className="active" id="login-box-link">Login</a>
    </div>
    <div className="social-login">
      <a href="#">
        <i className="fa fa-facebook fa-lg"></i>
        Login in with facebook
      </a>
      <a href="#">
        <i className="fa fa-google-plus fa-lg"></i>
        log in with Google
      </a>
    </div>
    <form className="email-login">
      <div className="u-form-group">
        <input type="email" placeholder="Email"/>
      </div>
      <div className="u-form-group">
        <input type="password" placeholder="Password"/>
      </div>
      <div className="u-form-group">
        <button>Log in</button>
      </div>
      <div className="u-form-group">
        <a href="#" className="forgot-password">Forgot password?</a>
      </div>
    </form>
  </div>
)
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
