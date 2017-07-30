'use strict'

module.exports = db => db.define('productTags', {
})

module.exports.associations = (ProductTag, {Product, Tag}) => {
  ProductTag.belongsTo(Product)
  ProductTag.belongsTo(Tag)
}
