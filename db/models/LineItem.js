'use strict'

const {STRING, INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('lineItems', {
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: true
  }
})

module.exports.associations = (LineItem, {Product, Order}) => {
  LineItem.belongsTo(Product)
  LineItem.bleongsTo(Order)
}
