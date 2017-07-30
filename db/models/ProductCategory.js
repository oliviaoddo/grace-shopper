'use strict'

module.exports = db => db.define('productCategories', {
})

module.exports.associations = (ProductCategory, {Product, Category}) => {
  ProductCategory.belongsTo(Product)
  ProductCategory.belongsTo(Category)
}
