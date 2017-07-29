const { STRING, ENUM, TEXT } = require('sequelize')

module.exports = db => db.define('reviews', {
  title: {
    type: STRING(30),
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  rating: {
    type: ENUM,
    values: ['1', '2', '3', '4', '5']
  }
}, {
  getterMethods: {
    shortTitle() {
      return this.title.substring(0, 20) + '...'
    }
  }
})
module.exports.associations = (Review, {Product, User}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}
