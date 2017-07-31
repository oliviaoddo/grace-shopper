import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom'
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
      <Input s={12} id="category" type="select" defaultValue="0" name="category">
          <option value="0" disabled>Select a Category</option>
          <option value="Necklaces">Necklaces</option>
          <option value="Rings">Rings</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Sterling_Silver">Sterling Silver</option>
          <option value="Gold_Filled">Gold Filled</option>
      </Input>

      <p>Sort by:</p>
      <Input s={12} id="sort" onChange={() => console.log("sort changed")} type="select" defaultValue="" name="sort">
          <option value="" disabled>Sort By</option>
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
