'use strict'

const {DATE, ENUM, DECIMAL, STRING} = require('sequelize')

module.exports = db => db.define('orders', {
  checkoutDateTime: DATE,
  subtotal: {
    type: DECIMAL(10, 2)
  },
  orderNumber: STRING,
  status: {
    type: ENUM('cart', 'pending', 'shipped', 'delivered'),
    allowNull: false,
    defaultValue: 'cart'
  }
})

module.exports.associations = (Order, {Product, LineItem, User}) => {
  Order.belongsToMany(Product, {through: LineItem})
  Order.belongsTo(User)
  Order.hasMany(LineItem)
}
