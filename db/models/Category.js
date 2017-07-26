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
}) // consider setter for upper/lower case so you don't get weird similar ones -- KHND

module.exports.associations = (Category, {Product}) => {
  Category.belongsToMany(Product, {through: 'productCategory'})
}
