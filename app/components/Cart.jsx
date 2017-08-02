import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import { connect } from "react-redux";
import { fetchCartItems, deleteProduct, updateProduct } from '../reducers/cart'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
    this.calculatePrice = this.calculatePrice.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.quantityChange = this.quantityChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCartItems()
    this.setState(this.state)
  }

  calculatePrice(price, quantity){
    return '$' + ((price * quantity).toFixed(2))
  }

  deleteItem(event){
    let cartValue = localStorage.getItem('cart')
    let cart = JSON.parse(cartValue)
    const product = this.props.items.filter(item => {
      return item.id === Number(event.target.id)
    })
    delete cart[event.target.id]
    let cartStr = JSON.stringify(cart)
    localStorage.setItem('cart', cartStr)
    this.props.deleteItem(product)

  }

  quantityChange(event){
    let cartValue = localStorage.getItem('cart')
    let cart = JSON.parse(cartValue)
    const product = this.props.items.filter(item => {
      return item.id === Number(event.target.id)
    })
    cart[event.target.id] = event.target.value
    let cartStr = JSON.stringify(cart)
    localStorage.setItem('cart', cartStr)
    this.props.updateItem(product, event.target.value)

  }


  render(){
    console.log('rerendered')
    const quantity = [];
    for(let i=1; i < 11; i++){
       quantity.push(<option key={i} value={i}>{i}</option>)

    }

    return (
      <div className="container">
      <h1>Cart</h1>
        {this.props.items.length ?
        <div>
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
              this.props.items.map(product => {
                return(
                  <tr>
                    <td><img className='cart-img' src={product.images.slice(-1)}/></td>
                    <td><Link to={`/shop/${product.id}`}>{product.name}</Link></td>
                    <td>
                      <div className='row'>
                        <div className='col m6'>
                          <Input type='select' id={product.id} onChange={this.quantityChange}  defaultValue={`${product.quantity}`} name="quantity" required>
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
        :
          <div>
            <h1 className='product-name'>Your cart is empty!</h1>
            <Link to='/shop'><button className='btn'>Start Shopping <i className="fa fa-chevron-circle-right" aria-hidden="true"></i></button></Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.cart.items
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  deleteItem: (product) => dispatch(deleteProduct(product)),
  updateItem: (product, quantity) => dispatch(updateProduct(product, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
