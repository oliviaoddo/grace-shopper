'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('tags', {
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
    formatTag: function(name) {
      this.setDataValue('name', name.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }))
    }
  }
})

module.exports.associations = (Tag, {Product, ProductTag}) => {
  Tag.belongsToMany(Product, {through: ProductTag})
}
