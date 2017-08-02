import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { fetchAllOrders } from '../../reducers/orders'
import { connect } from "react-redux";


class AdminOrderList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.currentUser || !this.props.currentUser.isAdmin) this.props.history.replace("/")
    this.props.fetchAllOrders()
  }


  render(){
    return (
      <div>
      {this.props.currentUser && this.props.currentUser.isAdmin ?
      <div className="container">
        <h1>Orders</h1>
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Order Number</th>
              <th>Date</th>
              <th>Subtotal</th>
              <th>Number of Items</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.orders.map(order => {
                return (
                        <tr key={order.id}>
                          <td>{order.user.firstName} {order.user.lastName}</td>
                          <td><Link to={`/order/${order.id}`}>{order.orderNumber}</Link></td>
                          <td>{order.checkoutDateTime}</td>
                          <td>{order.subtotal}</td>
                          <td>{order.inventory}</td>
                          <td>{order.status}</td>
                          <td><Link to={`/edit/${order.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>
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
  orders: state.orders.orders,
  currentUser: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAllOrders: () => dispatch(fetchAllOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderList)

