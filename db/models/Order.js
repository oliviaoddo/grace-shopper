'use strict'

const {DATE, ENUM, DECIMAL} = require('sequelize')

module.exports = db => db.define('orders', {
  checkoutDateTime: DATE,
  subtotal: {
    type: DECIMAL(10, 2)
  },
  status: {
    type: ENUM('cart', 'pending', 'shipped', 'delivered'),
    allowNull: false,
    defaultValue: 'cart'
  }
})

module.exports.associations = (Order, {Product, LineItem, User}) => {
  Order.belongsToMany(Product, {through: LineItem})
  Order.belongsTo(User)
}
