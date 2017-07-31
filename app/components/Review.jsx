import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import {connect} from 'react-redux'
import Stars from './Stars'

export default class addReview extends Component {
  constructor(props) {
    super(props)
  }
  // componentDidMount(){ }

  render() {
    return (
      <div className="container reviewCont">
        <div className="row">
          <div className="col s9">
            <h3>{this.props.review.shortTitle
            ? this.props.review.shortTitle
            : null}</h3>
          </div>
          <div className="col s3">
            <Stars id={this.props.id} rating={this.props.review.rating} count={1}/>
          </div>
        </div>
        <div className='row'>
          <p>{this.props.review.description
              ? this.props.review.description
              : null}</p>
        </div>
      </div>
    )
  }
}
