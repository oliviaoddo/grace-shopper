import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
  const productId = props.id;
  const count = props.count;
  const getStars = rating => {
    const starArr = [];
    for(let i = 1; i < 6; i++){
      if(props.rating >= i && Math.floor(props.rating) >= i) {starArr.push(<i className='fa fa-star' aria-hidden='true'></i>)}
      else if(props.rating === (i - .5)) {starArr.push(<i className='fa fa-star-half-o' aria-hidden='true'></i>)}
      else {starArr.push(<i className='fa fa-star-o' aria-hidden='true'></i>)}
    }
    return starArr;
  }
    return (
     <div className='star-rating'>
      {getStars()}
      <span className='sr-only'>{props.rating } out of 5 stars</span>
      <Link to='/allreviews'> {count} Reviews</Link>
    </div>
    )
}
