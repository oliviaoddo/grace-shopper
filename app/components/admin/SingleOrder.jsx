import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { fetchOrder } from '../../reducers/orders'
import { connect } from "react-redux";


class SingleOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const orderId = this.props.match.params.id
    if (!this.props.currentUser || !this.props.currentUser.isAdmin) this.props.history.replace("/")
    this.props.fetchOrder(orderId)
  }


  render(){
    return (
      <div>
      {this.props.currentUser && this.props.currentUser.isAdmin ?
      <div className="container">
        <h1 className='product-name'>{this.props.order.user.fullName}</h1>
        <p>Order number: {this.props.order.orderNumber}</p>
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th></th>
              <th>Date</th>
              <th>Subtotal</th>
              <th>Number of Items</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.order.lineItems.map(item => {
                return (
                        <tr key={item.product_id}>
                          <td>{item.product.SKU}</td>
                          <td>{item.product.images[1]}</td>
                          <td>{this.props.order.updated_at}</td>
                          <td>{this.props.order.subtotal}</td>
                          <td>{this.props.order.lineItems.length}</td>
                          <td>{this.props.order.status}</td>
                          <td><Link to={`/edit/${this.props.order.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>
                        </tr>
                        )
              })
            }
          </tbody>
        </table>
      </div>
      : null }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.orders.order,
  currentUser: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchOrder: (orderId) => dispatch(fetchOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)

