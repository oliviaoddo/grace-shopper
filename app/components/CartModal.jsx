import React from 'react';
import { Link } from 'react-router-dom'
import Stars from './Stars'
import {Chip} from 'react-materialize'

export default props => {
    return (
     <div className='row'>
      <div className='col m6'>
        <img className='product-img' src={props.product.images[1]}/>
      </div>
      <div className='col m6'>
        <h1 className='added-cart-header'>Added to your cart!</h1>
        <h2 className='product-cart-header'>{props.product.name}</h2>
        <Stars rating={4} id={props.product.id} count={23}/>
        <p>${props.product.price}</p>
        <p>Quantity: 2</p>
        <div>
          {props.product.categories.map(category => {
              return (
              <Link to='/allproducts'><Chip key={category.id} close={false}>{category.name}</Chip></Link>
              )
            })
          }
        </div>
        <Link to='/cart'><button onClick={()=>{$('#add').modal('close');}} className='btn checkout-btn'>View Cart <i className="fa fa-chevron-circle-right" aria-hidden="true"></i></button></Link>
      </div>
    </div>
    )
}
