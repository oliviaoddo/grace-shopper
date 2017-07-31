import React, {Component} from 'react'
import ProductCard from './admin/ProductCard'
import { Link } from 'react-router-dom'
import { fetchProduct } from '../reducers/products'
import { connect } from "react-redux";

class Home extends Component{

  componentDidMount() {
     const productId = 1
    this.props.fetchProducts()
  }

  render(){
    return(
    <div>
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br/><br/>
            <div className="row center">
              <Link id='shop-btn' to='/shop' className="btn-large waves-effect waves-light teal lighten-1">Shop <i className="fa fa-angle-right" aria-hidden="true"></i></Link>
            </div>
            <br/><br/>

          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_1793.jpg" alt="Unsplashed background img 1"/></div>
      </div>
      {this.props.product.name ?
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <ProductCard product={this.props.product}/>
            </div>

            <div className="col s12 m4">
             <ProductCard product={this.props.product} />
            </div>

            <div className="col s12 m4">
              <ProductCard product={this.props.product} />
            </div>
          </div>

        </div>
      </div> :null}


      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
            </div>
          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_6236.jpg" alt="Unsplashed background img 2"/></div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <div className="card">
                  <div className="card-image">
                    <img src="images/necklaces/BNWG3-3.jpg"/>
                  </div>
                </div>
                <Link to='/shop'><h5 className="center">Necklaces</h5></Link>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <div className="card">
                  <div className="card-image">
                    <img src="images/rings/RWG3-1.jpg"/>
                  </div>
                </div>
                <Link to='/shop'><h5 className="center">Rings</h5></Link>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <div className="card">
                  <div className="card-image">
                    <img src="/images/bracelets/SBAG1-2.jpg"/>
                  </div>
                </div>
                <Link to='/shop'><h5 className="center">Bracelets</h5></Link>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
            </div>
          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_7286.jpg" alt="Unsplashed background img 3"/></div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">person</i></h2>
                <h5 className="center">About</h5>

                <p className="light">Lorem ipsum dolor sit amet, at duo verear phaedrum intellegam, et sit graeco sensibus, maluisset reformidans referrentur ea cum. Ius in tota constituto, ex mutat melius pericula quo. Vis ignota graeco definitiones et. In diam tritani intellegam vim, habeo maiorum noluisse qui ei. At sed doming causae aeterno.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">email</i></h2>
                <h5 className="center">Contact</h5>

                <p className="light">Lorem ipsum dolor sit amet, at duo verear phaedrum intellegam, et sit graeco sensibus, maluisset reformidans referrentur ea cum. Ius in tota constituto, ex mutat melius pericula quo. Vis ignota graeco definitiones et. In diam tritani intellegam vim, habeo maiorum noluisse qui ei. At sed doming causae aeterno.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">photo_camera</i></h2>
                <h5 className="center">Loreum ipsum</h5>

                <p className="light">Lorem ipsum dolor sit amet, at duo verear phaedrum intellegam, et sit graeco sensibus, maluisset reformidans referrentur ea cum. Ius in tota constituto, ex mutat melius pericula quo. Vis ignota graeco definitiones et. In diam tritani intellegam vim, habeo maiorum noluisse qui ei. At sed doming causae aeterno.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
            </div>
          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_7286.jpg" alt="Unsplashed background img 3"/></div>
      </div>
    </div>
      )
    }
}

const mapStateToProps = state => ({
  product: state.products.product
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProduct: (productId) => dispatch(fetchProduct(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)

