const { STRING, ENUM, TEXT } = require('sequelize');

module.exports = db => db.define('reviews', {
  title: STRING,
  description: TEXT,
  rating: {
    type: ENUM,
    values: [1, 2, 3, 4, 5]
  }
})

module.exports.associations = (Review, {
  Product,
  User
}) => {
  //  Review.hasOne(Product) // check to see that the complement has been made
  Review.belongsTo(User)
}
