'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('categories', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  setterMethods: {
    formatCategory: function(name) {
      this.setDataValue('name', name.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }))
    }
  }
})

module.exports.associations = (Category, {Product, ProductCategory}) => {
  Category.belongsToMany(Product, {through: ProductCategory})
}
