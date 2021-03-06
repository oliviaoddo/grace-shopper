/* global $ */

/*
 * TODO make the dropdown not hardcoded i.e. change them to use maps with axios requests to get all of the elements
*/

import React, {Component} from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../reducers/categories'
import { connect } from 'react-redux'
import { logout } from '../reducers/auth'

class NavBar extends Component {
  constructor(props) {
    super(props);

  }


  componentDidMount() {
    $('.dropdown-button').dropdown()
  }


  adminNav(){
    return(
          <nav>
            <div id="logo" className="nav-wrapper">
              <Link to='/' className="brand-logo">Sea Candy</Link>
              <ul id="nav-btn-container" className="right hide-on-med-and-down">
                <li>
                  <Link to='/products'>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to='/orders'>
                    Orders
                  </Link>
                </li>
                <li onClick={this.props.logout}>
                    Logout
                </li>
              </ul>
            </div>
          </nav>
      )
  }

  genUserNav(){
    return(
          <div>
            <ul id="catDropdown" className="dropdown-content">
              <li>
                <Link to='/shop?category=Necklaces'>Necklaces</Link>
              </li>
              <li>
                <Link to='/shop?category=Bracelets'>Bracelets</Link>
              </li>
              <li>
                <Link to='/shop?category=Rings'>Rings</Link>
              </li>
            </ul>
            <nav>
              <div id="logo" className="nav-wrapper">
                <Link to='/' className="brand-logo">Sea Candy</Link>
                <ul id="nav-btn-container" className="right hide-on-med-and-down">
                  <li>
                    <a className="dropdown-button" href="#!" data-activates="catDropdown">Shop<i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </li>
                  {this.props.currentUser &&
                    <li>
                      <Link to={`/user/${this.props.currentUser.id}/orders`}><i className="material-icons right">person</i></Link>
                    </li>
                  }
                  <li>
                    <Link to='/cart'>
                      <i className="material-icons">shopping_cart</i>
                    </Link>
                  </li>
                  {this.props.currentUser ?
                   <li onClick={this.props.logout}>
                    Logout
                  </li> :
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  }
                  {!this.props.currentUser &&
                                    <li>
                      <Link to="/signup">Signup</Link>
                    </li>
                  }
                </ul>
              </div>
            </nav>
          </div>
      )
  }

  render() {
    return (
      <div>
        {this.props.currentUser && this.props.currentUser.isAdmin ? this.adminNav() : this.genUserNav()}
      </div>
    )
  }
}

const mapStateToProps = state => ({currentUser: state.auth})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
