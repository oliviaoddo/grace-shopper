/* global $ */

import React, {Component} from 'react'
import RatingStars from './RatingStars'
import Footer from './Footer'

export default class NavBar extends Component {
  componentDidMount() {
    $('.dropdown-button').dropdown()
  }

  render() {
    // if (!this.state) { return null }
    return (
      <div>
        <ul id="catDropdown" className="dropdown-content">
          <li>
            <a href="#!">Necklace</a>
          </li>
          <li>
            <a href="#!">Earings</a>
          </li>
          <li>
            <a href="#!">Rings</a>
          </li>
        </ul>
        <nav>
          <div id="logo" className="nav-wrapper">
            <a href="#!" className="brand-logo">DEOS</a>
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
                <a className="dropdown-button" href="#!" data-activates="catDropdown">Categories<i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="material-icons">shopping_cart</i>
                </a>
              </li>
              <li>
                <a href="badges.html">Login</a>
              </li>
            </ul>
          </div>
        </nav>
        <RatingStars />
        <Footer />
      </div>
    )
  }
}
