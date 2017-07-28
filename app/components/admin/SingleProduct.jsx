import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import Lightbox from 'react-images';
import ProductList from '../ProductList'
import Stars from '../Stars'

class SingleProduct extends Component{
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      images: [{ src: '/necklace.jpg' }, { src: '/necklaces_2.jpg' }]
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  openLightbox (index, event) {
    console.log('Open!');
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
    console.log('NEXT!');
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

  componentDidMount() {
    console.log(this.state.categories)
  }

  deleteCategory(event){
    this.setState({categories: this.state.categories.filter(category => {
          if(category.id !== event.target.id) return category;
        })})
    document.getElementById('catSelect').selectedIndex = 0;
  }

  catChange(event){
    const index = event.target.selectedIndex;
    this.setState({categories: this.state.categories.concat([{id: event.target.value, name: event.target.childNodes[index].text}])})
    document.getElementById('catSelect').selectedIndex = 0;
  }

  renderGallery () {
    console.log('renderedGallery')
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
    const product =
      {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', rating: 5, description: 'Lorem ipsum dolor sit amet, ut atomorum disputationi eam. Nec nostro ornatus complectitur in, an iudico tollit pri. Fuisset complectitur vix ex, nonumes democritum at nam. Libris vivendum maiestatis nam id.', inventory: 10, categories: [{id: 1, name:'Necklaces'}, {id: 2, name:'Gold'}], reviews: [1, 2, 5]}
    const quantity = [];
    for(let i=1; i < 11; i++){
       quantity.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div>
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
              <h1>{product.name}</h1>
              <Stars id={product.id} rating={product.rating} count={product.reviews.length}/>
              <p>{product.price}</p>
              {product.categories.map(category => {
                return (
                          <Link to='/allproducts'><Chip key={category.id} close={false}>{category.name}</Chip></Link>
                        )
                })
              }
              <p>{product.description}</p>
              <div className='row'>
                <div className='col m6'>
                  <Input  type='select' defaultValue='' name="quantity" required>
                  {quantity}
                  </Input>
                </div>
                <div className='col m6'>
                   <button type="submit" className="btn waves-effect waves-light teal addButton">Add to Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
        </div>
      <h2>Top Rated</h2>
      </div>
      <ProductList />
      </div>
    )
  }
}

export default SingleProduct
