import React, {Component} from 'react'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state ={
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.signup({email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, password: this.state.password})
  }

  render(){
    return (
      <div className="signup-box">
        <div className="lb-header">
          <a href="#" className="active" id="login-box-link">SignUp</a>
        </div>
        <form className="email-login" onSubmit={this.handleSubmit}>
          <div className="u-form-group">
            <input type="text" placeholder="First Name" onChange={(event) => this.setState({firstName: event.target.value })}/>
          </div>
          <div className="u-form-group">
            <input type="text" placeholder="Last Name" onChange={(event) => this.setState({lastName: event.target.value })}/>
          </div>
          <div className="u-form-group">
            <input type="email" placeholder="Email" onChange={(event) => this.setState({email: event.target.value })}/>
          </div>
          <div className="u-form-group">
            <input type="password" placeholder="Password" onChange={(event) => this.setState({password: event.target.value })}/>
          </div>
           <div className="u-form-group">
            <input type="password" placeholder="Confirm password"/>
          </div>
          <div className="u-form-group">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}
import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => ({
    signup: (user) => dispatch(signup(user, ownProps))
})

export default connect(null, mapDispatchToProps)(Signup);

