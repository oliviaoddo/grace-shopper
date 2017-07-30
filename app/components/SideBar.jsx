import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {Input, Chip} from 'react-materialize'

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: []
    }
    this.deleteFilter = this.deleteFilter.bind(this)
    this.filterChange = this.filterChange.bind(this)
  }

  deleteFilter(event){
    this.setState({filters: this.state.filters.filter(filter => {
          if(filter !== event.target.id) return filter;
        })})
    document.getElementById('filter').selectedIndex = 0;
  }

  filterChange(event){
    const index = event.target.selectedIndex;
    this.setState({filters: this.state.filters.concat(event.target.childNodes[index].text)})
    document.getElementById('filter').selectedIndex = 0;
  }

  render(){
    return (
     <div>
     <p>Shop by Category</p>
      <p><a onClick={()=>console.log('clicked')}>Necklaces</a></p>
      <p><a onClick={()=>console.log('clicked')}>Rings</a></p>
      <p><a onClick={()=>console.log('clicked')}>Bracelets</a></p>
      <p><a onClick={()=>console.log('clicked')}>Rare Sea Glass Jewelry</a></p>
      <p>Sort by:</p>
      <Input s={12} id='sort' onChange={() => console.log('sort changed')} type='select' defaultValue='' name="sort">
          <option value="newest">Newest Arrivals</option>
          <option value="oldest">Most Popular</option>
          <option value="low">Price low to high</option>
          <option value="high">Price high to low</option>
      </Input>
      <p>Filter</p>
      {this.state.filters.length ? this.state.filters.map(filter => {
          return (<Chip key={filter} close={false}>{filter} <a onClick={this.deleteFilter}><i id={filter} className="fa fa-times-circle fa-lg" aria-hidden="true"></i></a></Chip>)
      }): null}
      <Input s={12} id='filter' onChange={this.filterChange} type='select' defaultValue='0' name="filter">
          <option value="0" disabled>Select a Filter</option>
          <option value="gold">Gold Jewelry</option>
          <option value="silver">Silver Jewelry</option>
          <option value="green">Green Sea Glass</option>
          <option value="white">White Sea Glass</option>
          <option value="blue">Blue Sea Glass</option>
      </Input>
    </div>
    )
  }
}

export default SideBar
