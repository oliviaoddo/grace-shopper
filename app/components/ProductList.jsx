import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './admin/ProductCard'
import {Preloader} from 'react-materialize'
import SideBar from './SideBar'
import { connect } from "react-redux";
import {fetchProducts} from '../reducers/products'


class ProductList extends Component {
  constructor(props) {
    super(props);

  }

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
          {this.props.products.length ?
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
            : <Preloader size='big'/>}
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
