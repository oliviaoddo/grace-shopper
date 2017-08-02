import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import { fetchProduct, updateProduct, deleteProduct } from '../../reducers/products'
import { connect } from "react-redux";


class EditProduct extends Component{
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      sku: '',
      name: '',
      price: '',
      description: '',
      inventory: '',
      imageEntry: []
    }
    this.deleteCategory = this.deleteCategory.bind(this)
    this.catChange = this.catChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.getProduct(productId)
    .then(() => {
      this.setState({sku: this.props.product.SKU, name: this.props.product.name, price: this.props.product.price, description: this.props.product.description, inventory: this.props.product.inventory})
    })
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

  handleSubmit(event){
    event.preventDefault()
    const formData = new FormData();
    // const fileInput = document.getElementById('product-image');
    formData.append('SKU', event.target.sku.value);
    formData.append('name',  event.target.name.value);
    formData.append('price',   Number(event.target.price.value));
    // for(let i = 0; i < fileInput.files.length; i++){
    //   formData.append('images', fileInput.files[i]);
    // }
    formData.append('description', event.target.description.value);
    formData.append('inventory', Number(event.target.inventory.value));
    formData.append('categories', [1,2]);
    this.props.update(formData)
  }

  handleDelete(event){
    this.props.removeProduct(event.target.id);
  }

  render(){
    const categories = [{id: 1, name:'Necklaces'}, {id: 2, name:'Bracelets'}, {id: 3, name:'Rings'}]
    const inventory = [];
    for(let i=1; i < 51; i++){
       inventory.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div className="container">
        <h1 className='product-name'>Edit Product <a><i id={this.props.product.id} onClick={this.handleDelete} className="fa fa-times-circle" aria-hidden="true"></i></a></h1>
        <div className='row'>
            <div className='col m12 s12'>
              <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="sku" type="text" name='sku' value={this.state.sku} onChange={(event) => this.setState({sku: event.target.value})} />
                    <label htmlFor="sku" className='active'>SKU</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="prod_name" type="text" name='name' value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} />
                    <label htmlFor="prod_name" className='active'>Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="price" type="text" name='price' value={this.state.price} onChange={(event) => this.setState({price: event.target.value})} />
                    <label htmlFor="price" className='active'>Price</label>
                  </div>
                  <div className="input-field col s12">
                    <textarea id="description" className="materialize-textarea" value={this.state.description} name='description' onChange={(event) => this.setState({description: event.target.value})} ></textarea>
                    <label htmlFor="description" className='active'>Description</label>
                  </div>
                   <Input s={12} type='select'  defaultValue={this.state.inventory} name="inventory" required >
                       <option value="" disabled>Inventory</option>
                        {inventory}
                  </Input>
                  <Input s={12} id='catSelect' onChange={this.catChange} type='select' defaultValue='' name="category">
                    <option value="" disabled>Select a Category</option>
                    {
                      categories.map(category =>{
                        return <option key={category.id} value={category.id}>{category.name}</option>
                      })
                    }
                  </Input>
                  {this.state.categories.length ? this.state.categories.map(category => {
                    return (<Chip key={category.id} close={false}>{category.name} <a onClick={this.deleteCategory}><i id={category.id} className="fa fa-times-circle fa-lg" aria-hidden="true"></i></a></Chip>)
                  }): null}
                  <div className="file-field input-field inline">
                  <div className="btn">
                    <span>File</span>
                    <input onChange={(event)=>this.setState({imageEntry: this.imageEntry.concat(event.target.value.slice(12))})} id="product-image" name="image" type="file" multiple/>
                  </div>
                  <div className="file-path-wrapper">
                    <input placeholder="Upload Photos" className="file-path validate" type="text" value={this.state.imageEntry}/>
                  </div>
                </div>
                  <div className="input-field col s12">
                    <button type="submit" className="btn waves-effect waves-light teal addButton">Update</button>
                  </div>
                </div>
              </form>
            </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  currentUser: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProduct: (productId) => dispatch(fetchProduct(productId)),
  update: (product) => dispatch(updateProduct(product, ownProps.match.params.id)),
  removeProduct: (id) => {
    dispatch(deleteProduct(id))
    ownProps.history.push('/products')
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
