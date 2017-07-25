'use strict'

const {STRING, DATE, ENUM, INTEGER, TEXT, FLOAT, DECIMAL} = require('sequelize')

module.exports = db => db.define('orders', {
  checkoutDateTime: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  subtotal: {
    type: INTEGER,
    allowNull: true
  },
  status: {
    type: ENUM('cart', 'pending', 'shipped', 'delivered'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  getterMethods: {
    total: function() {
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
  Order.hasMany(Product, {through: LineItem})
  Order.belongsTo(User)
}
