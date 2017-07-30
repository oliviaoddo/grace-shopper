'use strict'

const { STRING, ARRAY, INTEGER, TEXT, FLOAT, DECIMAL } = require('sequelize')

module.exports = db => db.define('products', {
  SKU: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT
  },
  inventory: {
    type: INTEGER,
    validate: {
      min: 0
    }
  },
  rating: DECIMAL(10, 2),
  images: {
    type: ARRAY(STRING),
    defaultValue: ['http://www.keil.com/Content/images/photo_default.png']
  }
})

module.exports.associations = (Product, {Order, ProductCategory, ProductTag, LineItem, Review, Category, Tag}) => {
  Product.belongsToMany(Order, {through: LineItem})
  Product.hasMany(Review)
  Product.belongsToMany(Category, {through: ProductCategory})
  Product.belongsToMany(Tag, {through: ProductTag})
}
