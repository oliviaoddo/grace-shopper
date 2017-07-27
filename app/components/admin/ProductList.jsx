import React from 'react'
import { Link } from 'react-router-dom'

const ProductList = props => {
  const products = [
    {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', inventory: 10},
    {id: 2, SKU: 'NG1', name: 'Green Necklace', price:'$20.00', inventory: 30},
    {id: 3, SKU: 'NW1', name: 'White Necklace', price:'$21.00', inventory: 15}
    ]
  return (
    <div className="container">
      <h1>Products</h1>
      <Link to={`/add`} className="btn-floating btn-large waves-effect waves-light teal"><i className="material-icons">add</i></Link>

      <table className="highlight responsive-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {
            products.map(product => {
              return (
                      <tr key={product.id}>
                        <td>{product.SKU}</td>
                        <td><Link to={`/single/${product.id}`}>{product.name}</Link></td>
                        <td>{product.price}</td>
                        <td>{product.inventory}</td>
                        <td><Link to={`/edit/${product.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>
                          <td><a onClick={() => console.log('deleted')}><i className="fa fa-times-circle" aria-hidden="true"></i></a></td>
                      </tr>
                      )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
