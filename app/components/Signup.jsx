import React from 'react'

export const Signup = ({ signup }) => (
  <div className="signup-box">
    <div className="lb-header">
      <a href="#" className="active" id="login-box-link">SignUp</a>
    </div>
    <form className="email-login">
      <div className="u-form-group">
        <input type="email" placeholder="First Name"/>
      </div>
      <div className="u-form-group">
        <input type="email" placeholder="Last Name"/>
      </div>
      <div className="u-form-group">
        <input type="email" placeholder="Email"/>
      </div>
      <div className="u-form-group">
        <input type="password" placeholder="Password"/>
      </div>
       <div className="u-form-group">
        <input type="password" placeholder="Confirm password"/>
      </div>
      <div className="u-form-group">
        <button>Sign In</button>
      </div>
    </form>
  </div>
)
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Signup)
