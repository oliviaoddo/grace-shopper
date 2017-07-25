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
})

module.exports.associations = (Tag, {Product}) => {
  Tag.belongsToMany(Product, {through: 'productTag'})
}
