import React, {Component} from 'react'

class Login extends Component{
  constructor(props) {
    super(props);
    this.state ={
        email: '',
        password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.login(this.state.email, this.state.password)
  }

  render(){
    return(
      <div className="login-box">
        <div className="lb-header">
          <a href="#" className="active" id="login-box-link">Login</a>
        </div>
        <div className="social-login">
          <a href="#">
            <i className="fa fa-facebook fa-lg"></i>
            Login in with facebook
          </a>
          <a target='-self' href='/api/auth/login/google'>
            <i className="fa fa-google-plus fa-lg"></i>
            log in with Google
          </a>
        </div>
        <form onSubmit={this.handleSubmit}className="email-login">
          <div className="u-form-group">
            <input type="email" placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/>
          </div>
          <div className="u-form-group">
            <input type="password" placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
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
  }
}
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: (username, password) => dispatch(login(username, password, ownProps))
})

export default connect(null, mapDispatchToProps)(Login);
