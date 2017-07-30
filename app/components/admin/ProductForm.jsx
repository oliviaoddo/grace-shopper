import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'
import { postProduct } from '../../reducers/products'
import { connect } from "react-redux";


class ProductForm extends Component{
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
    this.deleteCategory = this.deleteCategory.bind(this);
    this.catChange = this.catChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event){
    console.log(this.state.categories)
    event.preventDefault()
    const formData = new FormData();
    const fileInput = document.getElementById('product-image');
    formData.append('SKU', event.target.sku.value);
    formData.append('name',  event.target.name.value);
    formData.append('price',   Number(event.target.price.value));
    for(let i = 0; i < fileInput.files.length; i++){
      formData.append('images', fileInput.files[i]);
    }
    formData.append('description', event.target.description.value);
    formData.append('inventory', Number(event.target.inventory.value));
    formData.append('categories', this.state.categories);
    this.props.addProduct(formData)
  }

  render(){
    const categories = [{id: 1, name:'Necklaces'}, {id: 2, name:'Bracelets'}, {id: 3, name:'Rings'}]
    const inventory = [];
    for(let i=1; i < 51; i++){
       inventory.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div className="container">
        <h1 className='product-name'>Add Product</h1>
        <div className='row'>
            <div className='col m12 s12'>
              <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="sku" type="text" name='sku' value={this.state.sku} onChange={(event) => this.setState({sku: event.target.value})} />
                    <label htmlFor="sku">SKU</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="prod_name" type="text" name='name' value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} />
                    <label htmlFor="prod_name">Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="price" type="text" name='price' value={this.state.price} onChange={(event) => this.setState({price: event.target.value})} />
                    <label htmlFor="price">Price</label>
                  </div>
                  <div className="input-field col s12">
                    <textarea id="description" className="materialize-textarea" value={this.state.description} name='description' onChange={(event) => this.setState({description: event.target.value})} ></textarea>
                    <label htmlFor="description">Description</label>
                  </div>
                   <Input s={12} type='select' defaultValue='' name="inventory" required >
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
                    <input onChange={(event)=>this.setState({imageEntry: this.imageEntry.concat(event.target.value.slice(12))})} id="product-image" name="image" type="file" multiple required/>
                  </div>
                  <div className="file-path-wrapper">
                    <input placeholder="Upload Photos" className="file-path validate" type="text" value={this.state.imageEntry}/>
                  </div>
                </div>
                  <div className="input-field col s12">
                    <button type="submit" className="btn waves-effect waves-light teal addButton">CREATE</button>
                  </div>
                </div>
              </form>
            </div>
        </div>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  addProduct: (product) => dispatch(postProduct(product))
});

export default connect(null, mapDispatchToProps)(ProductForm)
