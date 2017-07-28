import React from 'react';

export default props => {
  const reviews = props.reviews || [];
  return (
    <div>
    {
      reviews.map(review => {
        return (
          <div>
            <h4>{review.name}</h4>
            <p>{review.description}</p>
          </div>
        )
      })
    }
    </div>
  )
}
