import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip, Modal} from 'react-materialize'
import Stars from './Stars'

class QuickLook extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const product =
      {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', rating: 5, photos: ['/necklace.jpg'], description: 'Lorem ipsum dolor sit amet, ut atomorum disputationi eam. Nec nostro ornatus complectitur in, an iudico tollit pri. Fuisset complectitur vix ex, nonumes democritum at nam. Libris vivendum maiestatis nam id.', inventory: 10, categories: [{id: 1, name:'Necklaces'}, {id: 2, name:'Gold'}], reviews: [1, 2, 5]}
    const quantity = [];
    for(let i=1; i < 11; i++){
       quantity.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div className="container">
        <div className='row'>
            <div className='col m12'>
              <img src={`${product.photos[0]}`} />
            </div>
            <div className='col m12'>
              <Link to={`/single-product/${product.id}`}><h1>{this.props.product.name}</h1></Link>
              <div className='row'>
                <div className='col s6'>
                <Stars id={this.props.product.id} rating={product.rating} count={product.reviews.length}/>
                <p>{this.props.product.price}</p>
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
        </div>
        </div>
    )
  }
}

export default QuickLook
