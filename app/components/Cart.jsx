import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import {fetchCart, updateCart, removeCart, updateOrderStatus} from '../reducers/orders'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
    this.calculatePrice = this.calculatePrice.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentDidMount() {
    console.log(this.state.categories)
  }

  calculatePrice(price, quantity){
    return '$' + ((price * quantity).toFixed(2))
  }

  deleteItem(){
    console.log('item deleted!')
  }

  render(){
   const products = [
    {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'22.50', quantity: 1, photos: ['/necklace_thumbnail.jpg']},
    {id: 2, SKU: 'NG1', name: 'Green Necklace', price:'20.00', quantity: 2, photos: ['/necklace_thumbnail.jpg']},
    {id: 3, SKU: 'NW1', name: 'White Necklace', price:'21.00', quantity: 3, photos: ['/necklace_thumbnail.jpg']},
    {id: 4, SKU: 'RG1', name: 'Green Ring', price:'18.00', quantity: 1, photos: ['/necklace_thumbnail.jpg']}
    ]

    const quantity = [];
    for(let i=1; i < 11; i++){
       quantity.push(<option key={i} value={i}>{i}</option>)

    }

    return (
      <div className="container">
      <h1>Cart</h1>
        <table className='striped'>
          <thead>
            <tr>
                <th></th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {
              products.map(product => {
                return(
                  <tr>
                    <td><img src={product.photos[0]}/></td>
                    <td><Link to={`/shop/${product.id}`}>{product.name}</Link></td>
                    <td>
                      <div className='row'>
                        <div className='col m6'>
                          <Input type='select' defaultValue={`${product.quantity}`} name="quantity" required>
                            {quantity}
                          </Input>
                        </div>
                      </div>
                    </td>
                    <td>{this.calculatePrice(product.price, product.quantity)}</td>
                    <td><a onClick={this.deleteItem}><i id={product.id} className="fa fa-times-circle fa-lg" aria-hidden="true"></i></a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button className='btn checkout-btn'>Checkout <i className="fa fa-chevron-circle-right" aria-hidden="true"></i></button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  singleOrder: state.singleOrder,
  cartProducts: state.cartProducts
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  updateCart: () => dispatch(updateCart()),
  removeCart: () => dispatch(removeCart()),
  updateOrderStatus: () => dispatch(updateOrderStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
