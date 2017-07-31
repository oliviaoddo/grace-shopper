/* global $ */
import React, {Component} from 'react'

export default class RatingStars extends Component {
  constructor() {
    super()
    this.state = {
      rating: 0,
      onHoverRating: 0,
    }
    this.yellow = this.yellow.bind(this)
    this.black = this.black.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }
  yellow = function(evt) {
    var stars = $('.star-rating-container').children()
    for (var i = 0; i < +evt.target.accessKey; i++) {
      stars[i].className = 'material-icons colored'
    }
    this.state.onHoverRating = +evt.target.accessKey
  }
  black = function(evt) {
    var stars = $('.star-rating-container').children()
    if (this.state.rating === 0) {
      for (var i = 0; i < 5; i++) {
        stars[i].className = 'material-icons'
      }
    } else {
      for (var i = this.state.rating; i < stars.length; i++) {
        stars[i].className = 'material-icons'
      }
    }
    this.state.onHoverRating = 0
  }
  changeRating = function() {
    this.state.rating = this.state.onHoverRating
    this.props.setRating(this.state.rating)
  }
  render() {
    if (!this.state) { return null }
    return (
      <div className="star-rating-container">
           <i onMouseOver={evt => this.yellow(evt)} onMouseOut={evt => this.black(evt)} onClick={this.changeRating} className="material-icons" accessKey='1'>star</i>
           <i onMouseOver={evt => this.yellow(evt)} onMouseOut={evt => this.black(evt)} onClick={this.changeRating} className="material-icons" accessKey='2'>star</i>
           <i onMouseOver={evt => this.yellow(evt)} onMouseOut={evt => this.black(evt)} onClick={this.changeRating} className="material-icons" accessKey='3'>star</i>
           <i onMouseOver={evt => this.yellow(evt)} onMouseOut={evt => this.black(evt)} onClick={this.changeRating} className="material-icons" accessKey='4'>star</i>
           <i onMouseOver={evt => this.yellow(evt)} onMouseOut={evt => this.black(evt)} onClick={this.changeRating} className="material-icons" accessKey='5'>star</i>
      </div>
    )
  }
}
