import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip, Modal} from 'react-materialize'
import Stars from './Stars'

class QuickLook extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const quantity = [];
    for(let i=1; i < 11; i++){
       quantity.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div className="container">
      {this.props.product.name ?
        <div className='row'>
            <div className='col m12'>
              <img className='product-img' src={`${this.props.product.images[0]}`} />
            </div>
            <div className='col m12'>
              <Link to={`/shop/${this.props.product.id}`}><h1 className='product-name'>{this.props.product.name}</h1></Link>
              <div className='row'>
                <div className='col s6'>
                <Stars id={this.props.product.id} rating={this.props.product.rating} count={2}/>
                <p>${this.props.product.price}</p>
                {this.props.product.categories.map(category => {
                  return (
                            <Link key={category.id} to='/allproducts'><Chip key={category.id} close={false}>{category.name}</Chip></Link>
                          )
                  })
                }
                </div>
                <div className='col s6'>
                   <div className='row'>
                    <div className='col m6'>
                      <Input  type='select' defaultValue='' name="quantity" required>
                      {quantity}
                      </Input>
                    </div>
                    <div className='col m6'>
                       <button type="submit" className="btn waves-effect waves-light teal addButton">Add <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <p>{this.props.product.description}</p>
            </div>
        </div> : null}
        </div>
    )
  }
}

export default QuickLook
