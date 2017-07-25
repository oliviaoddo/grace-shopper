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
  rating: FLOAT,
  images: {
    type: ARRAY(STRING),
    defaultValue: ['http://www.keil.com/Content/images/photo_default.png']
  }
}, {
  getterMethods: {
    price: function() {
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
