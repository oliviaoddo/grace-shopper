import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, deleteProduct } from '../../reducers/products'
import { connect } from "react-redux";


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    if (!this.props.currentUser || !this.props.currentUser.isAdmin) this.props.history.replace("/")
    this.props.getProducts()
  }

  handleDelete(event){
    this.props.removeProduct(event.target.id);
  }

  render(){
    return (
      <div>
      {this.props.currentUser && this.props.currentUser.isAdmin ?
      <div className="container">
        <h1>Products</h1>
        <Link to='/addProduct' className="btn-floating btn-large waves-effect waves-light teal"><i className="material-icons">add</i></Link>
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map(product => {
                return (
                        <tr key={product.id}>
                          <td>{product.SKU}</td>
                          <td><Link to={`/single/${product.id}`}>{product.name}</Link></td>
                          <td>{product.price}</td>
                          <td>{product.inventory}</td>
                          <td><Link to={`/edit/${product.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>
                            <td><a><i id={product.id} onClick={this.handleDelete} className="fa fa-times-circle" aria-hidden="true"></i></a></td>
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
  products: state.products.products,
  currentUser: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProducts: () => dispatch(fetchProducts()),
  removeProduct: (id) => dispatch(deleteProduct(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
