'use strict'

const {STRING, ARRAY, INTEGER, TEXT, FLOAT, DECIMAL} = require('sequelize')

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
    type: INTEGER,
    allowNull: false
    // default value of 0 -- KHND
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
  rating: FLOAT, // consider Decimal (can't remember but weird rounding things with floats) -- KHND - ACTION ITEM
  images: {
    type: ARRAY(STRING),
    defaultValue: ['http://www.keil.com/Content/images/photo_default.png']
  }
}, {
  getterMethods: {
    price: function() { // consider 1 line OR decimal(10,2) -- KHND
      const dollarAmt = this.getDataValue('price') / 100
      return dollarAmt.toFixed(2)
    }
  },
  setterMethods: {
    price: function(dollars) {
      this.setDataValue('price', dollars * 100)
    }
  }
})

module.exports.associations = (Product, {Order, LineItem, Review, Category, Tag}) => {
  Product.belongsToMany(Order, {through: LineItem})
  Product.hasMany(Review)
  Product.belongsToMany(Category, {through: 'productCategory'})
  Product.belongsToMany(Tag, {through: 'productTag'})
}
