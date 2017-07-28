import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'


class ProductForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
    this.deleteCategory = this.deleteCategory.bind(this);
    this.catChange = this.catChange.bind(this);
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

  render(){
    const product =
      {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', inventory: 10}
    const categories = [{id: 1, name:'Necklaces'}, {id: 2, name:'Bracelets'}, {id: 3, name:'Rings'}]
    const inventory = [];
    for(let i=1; i < 51; i++){
       inventory.push(<option key={i} value={i}>{i}</option>)

      }
    return (
      <div className="container">
        <h1>Add Product</h1>
        <div className='row'>
            <div className='col m6 s12'>
              <img src='/necklace.jpg' alt="Sea Glass Necklace"/>
            </div>
            <div className='col m6 s12'>
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="sku" type="text" />
                    <label htmlFor="sku">SKU</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="prod_name" type="text" />
                    <label htmlFor="prod_name">Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="price" type="text" />
                    <label htmlFor="price">Price</label>
                  </div>
                  <div className="input-field col s12">
                    <textarea id="description" className="materialize-textarea"></textarea>
                    <label htmlFor="description">Description</label>
                  </div>
                   <Input s={12} type='select' defaultValue='' name="inventory" required>
                       <option value="" disabled>Inventory</option>
                        {inventory}
                  </Input>
                  <Input s={12} id='catSelect' onChange={this.catChange} type='select' defaultValue='' name="category" required>
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

export default ProductForm
