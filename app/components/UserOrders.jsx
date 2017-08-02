import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, deleteProduct } from '../reducers/products'
import { fetchUserOrders } from '../reducers/orders'
import { fetchReviews } from '../reducers/reviews'
import { connect } from 'react-redux'

class UserOrders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserOrders(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    return (
      <div className="container">
        <h1 className='product-name'>Order History</h1>
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>Order#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.orders.map(order => {
                return (
                        <tr key={order.id}>
                          <td>{order.orderNumber}</td>
                          <td>{order.checkoutDateTime}</td>
                          <td>{order.subtotal}</td>
                          <td>{order.status}</td>
                        </tr>
                        )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  currentUser: state.auth,
  orders: state.orders.orders
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProducts: () => dispatch(fetchProducts()),
  removeProduct: (id) => dispatch(deleteProduct(id)),
  getUserOrders: (userId) => dispatch(fetchUserOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
