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

  // Kate prefers willMount, consider - NDKH
  componentDidMount() {
    this.props.fetchProducts(this.props.location.search)
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
            {/* Consistent styling/tabbing/spacing -NDKH */}
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
  fetchProducts: (ownProps) => dispatch(fetchProducts(ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
