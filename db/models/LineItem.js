'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('lineItems', {
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: INTEGER,
    allowNull: true
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
