import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip, Modal, Button, Preloader, Col} from 'react-materialize'
import Lightbox from 'react-images';
import ProductCard from './ProductCard'
import Review from '../Review'
import Stars from '../Stars'
import CartModal from '../CartModal'
import { connect } from "react-redux";
import {fetchProduct} from '../../reducers/products'
import TopRated from '../TopRated'


class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      images: [],
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage () {
    if (this.state.currentImage === this.state.images.length - 1) return;
    this.gotoNext();
  }

  addToCart(event){
    event.preventDefault();
    if(!localStorage.cart){
      let cart = {}
      let cartStr = JSON.stringify(cart)
      localStorage.setItem('cart', cartStr)
    }
    let cartValue = localStorage.getItem('cart')
    let cart = JSON.parse(cartValue)
    if(Object.keys(cart).includes(this.props.product.id.toString())){
      cart[this.props.product.id] += Number(event.target.quantity.value)
    }
    else {
      cart[this.props.product.id] = Number(event.target.quantity.value)
    }
    let cartStr = JSON.stringify(cart)
    localStorage.setItem('cart', cartStr)
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.fetchProduct(productId)
    .then(() => {
      const imageSrc = this.props.product.images.map(image =>{
        return {src: image}
      })
      this.setState({images: this.state.images.concat(imageSrc) })
    })

  }

  renderGallery () {
    console.log(this.state.images)
    const images = this.state.images;

    if (!images) return;

    const gallery = images.map((image, index) =>{
      return (
                <a key={image.src} onClick={(e) => this.openLightbox(index, e)}>
                  <img className='product-img' src={image.src}/>
                </a>
              )
    })

    return (
        gallery
    );
  }

  render(){
    const quantity = [];
    for(let i=1; i < 11; i++){
       quantity.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div className='container-section'>
      {this.props.product.name ?
        <div className="container">
          <div className='row'>
              <div className='col m6 s12'>
                <div>
                  {this.renderGallery()[this.state.currentImage]}
                </div>
              <div className='galleryControl'>
                {this.state.images[this.state.currentImage - 1] ? <a onClick={this.gotoPrevious} disabled><i className="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i></a> : null}
                {this.state.images[this.state.currentImage + 1] ? <a onClick={this.gotoNext}><i className="fa fa-chevron-circle-right fa-2x" aria-hidden="true"></i></a> : null}
              </div>
              <Lightbox
                  currentImage={this.state.currentImage}
                  images={this.state.images}
                  isOpen={this.state.lightboxIsOpen}
                  onClickPrev={this.gotoPrevious}
                  onClickNext={this.gotoNext}
                  onClose={this.closeLightbox}
                />
              </div>
              <div className='col m6 s12'>
                <h1 className='product-name'>{this.props.product.name}</h1>
                <Stars id={this.props.product.id} rating={this.props.product.rating} count={this.props.product.reviews.length}/>
                <p>${this.props.product.price}</p>
                {this.props.product.categories.map(category => {
                  return (
                            <Link to='/allproducts'><Chip key={category.id} close={false}>{category.name}</Chip></Link>
                          )
                  })
                }
                <p>{this.props.product.description}</p>
                <form onSubmit={this.addToCart}>
                <div className='row'>
                  <div className='col m6'>
                    <Input  type='select' defaultValue='' name="quantity" required>
                    {quantity}
                    </Input>
                  </div>
                  <div className='col m6'>
                    <Button type='submit' className="btn waves-effect waves-light teal addButton" onClick={()=>{$('#add').modal('open');}}>Add to Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i></Button>
                    <Modal id='add'><CartModal product={this.props.product} /></Modal>
                  </div>
                </div>
                </form>
              </div>
          </div>
        </div>
        :
            <Preloader size='big'/>
        }
        {this.props.product.reviews ? console.log(this.props.product.reviews, 'this is reviews') : null}
        {this.props.product.reviews ? this.props.product.reviews.map(review => <Review key={review.id} review={review} />) : null}
      <div className='container'>
        <h2>Top Rated</h2>
        <TopRated />
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
