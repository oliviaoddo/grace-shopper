import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import {connect} from 'react-redux'
import RatingStars from './RatingStars'
import {postReview} from '../reducers/reviews.jsx'

export default class addReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      rating: 0,
      description: ''
    }
    this.changeRating = this.changeRating.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
  }

  changeRating(rating){
    this.state.rating = rating;
  }

  submitForm(evt){
    evt.preventDefault()
    postReview(this.state)
  }

  updateTitle(evt) {
    this.state.title = evt.target.value;
  }

  updateDescription(evt) {
    this.state.description = evt.target.value;
  }

  render() {
    return (
      <div className="container">
        <h1>Leave review</h1>
        <div className='row'>
          <div id="loginPassword" className="input-field col s6">
            <input onChange={evt => this.updateTitle(evt)} id="reviewTitle" type="text"/>
            <label htmlFor="icon_telephone">Title</label>
          </div>
          <div id="loginPassword" className="input-field col s6">
            <RatingStars setRating={this.changeRating}/>
          </div>
        </div>
        <div className='row'>
          <textarea onChange={evt => this.updateDescription(evt)} id="reviewTextarea"/>
        </div>
        <div className="row">
          <button
            onClick={evt => this.submitForm(evt)}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            value="Login">Submit review
            <i className="material-icons right">check</i>
          </button>
        </div>
      </div>
    )
  }
}
