import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './admin/ProductCard'
import {Preloader} from 'react-materialize'

import { connect } from "react-redux";
import {fetchProduct, fetchTopRated} from '../reducers/products'

class TopRated extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {
    this.props.fetchTopRated()
  }

  render(){
    return (
        <div className='row'>
        {this.props.topProducts.length ?
          <div>
            {this.props.topProducts.map(product => {
              return(
                     <div className='col m4'>
                      <ProductCard product={product} />
                    </div>
              )
            })
            }
          </div>
        : <Preloader size='big' />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topProducts: state.products.topProducts
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTopRated: () => dispatch(fetchTopRated())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRated)
