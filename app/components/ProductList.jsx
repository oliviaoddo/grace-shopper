import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './admin/ProductCard'

const ProductList = props => {
  const products = [
    {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', inventory: 10},
    {id: 2, SKU: 'NG1', name: 'Green Necklace', price:'$20.00', inventory: 30},
    {id: 3, SKU: 'NW1', name: 'White Necklace', price:'$21.00', inventory: 15},
    {id: 4, SKU: 'RG1', name: 'Green Ring', price:'$18.00', inventory: 15}
    ]
  return (
    <div className="container">
      <div className='row'>
        {
        products.map(product => {
          return(
          <div className='col m4' key={product.id}>
            <ProductCard product={product} />
          </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default ProductList
