import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './admin/ProductCard'
import SideBar from './SideBar'
import { connect } from "react-redux";
import {fetchProducts} from '../reducers/products'


class ProductList extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render(){
    return (
      <div className="container">
        <div className='row'>
          <div className='col m4'>
            <SideBar />
          </div>
          <div className='col m8'>
          {this.props.products.map(product => {
            return(
            <div className='col m6' key={product.id}>
              <ProductCard product={product} />
            </div>
            )
          })
          }
        </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  products: state.products.products
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)