import React, {Component} from 'react'

export default class NavBar extends Component {
  render() {
    // if (!this.state) { return null }
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="#!">Necklace</a>
          </li>
          <li>
            <a href="#!">two</a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#!">three</a>
          </li>
        </ul>
        <nav>
          <div id="logo" className="nav-wrapper">
            <a href="#!" className="brand-logo">DEOS</a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="sass.html">Sass</a>
              </li>
              <li>
                <a href="badges.html">Components</a>
              </li>
              <li>
                <a className="dropdown-button" href="#!" data-activates="dropdown1">Categories<i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
