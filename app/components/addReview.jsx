import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import {connect} from 'react-redux'
import RatingStars from './RatingStars'

export default class addReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      rating: 0,
      reviewText: ''
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Leave review</h1>
        <div className='row'>
          <div id="loginPassword" className="input-field col s6">
            <input id="reviewTitle" type="text"/>
            <label for="icon_telephone">Title</label>
          </div>
          <div id="loginPassword" className="input-field col s6">
            <RatingStars/>
          </div>
        </div>
        <div className='row'>
          <textarea id="reviewTextarea"/>
        </div>
        <div className="row">
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            value="Login">Submit review
            <i className="material-icons right">add</i>
          </button>
        </div>
      </div>
    )
  }
}

