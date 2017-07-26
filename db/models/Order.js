'use strict'

const {STRING, DATE, ENUM, INTEGER, TEXT, FLOAT, DECIMAL} = require('sequelize')

module.exports = db => db.define('orders', {
  checkoutDateTime: {
    type: DATE,
    allowNull: false, // change me because carts -- KHND
    validate: {
      notEmpty: true // delete me -- KHND
    }
  },
  subtotal: {
    type: INTEGER,
    allowNull: true // do I need this? -- KHND
  },
  status: {
    type: ENUM('cart', 'pending', 'shipped', 'delivered'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
    // default value -- KHND
  }
}, {
  getterMethods: {
    total: function() { // consider decimal(10,2)
      const dollarAmt = this.getDataValue('subtotal') / 100
      return dollarAmt.toFixed(2)
    }
  },
  setterMethods: {
    total: function(dollars) {
      this.setDataValue('subtotal', dollars * 100)
    }
  }
})

module.exports.associations = (Order, {Product, LineItem, User}) => {
  Order.belongsToMany(Product, {through: LineItem})
  Order.belongsTo(User)
  Order.hooks('beforeValidate', function (instance) {

  }) OR Order.beforeValidate(function(instance){})
}
