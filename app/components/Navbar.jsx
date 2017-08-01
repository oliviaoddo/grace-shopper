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

  render() {
    // if (!this.state) { return null }
    return (
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
            <a>
              <form>
                <div id="search-bar" className="input-field">
                  <input id="search" type="search" placeholder="search" required/>
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons">search</i>
                  </label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </a>
            <ul id="nav-btn-container" className="right hide-on-med-and-down">
              <li>
                <a className="dropdown-button" href="#!" data-activates="catDropdown">Shop<i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
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
}

const mapStateToProps = state => ({currentUser: state.auth})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
