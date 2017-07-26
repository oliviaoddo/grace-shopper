const { STRING, ENUM, TEXT } = require('sequelize');

/* KHND
TODO
- check if 
*/

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
    values: [1, 2, 3, 4, 5]
  }
},{
  getterMethods: {
    shortTitle() {
      return this.title.substring(0, 20) + '...';
    }
  }
})

module.exports.associations = (Review, { // styling consistency -- KHND
  Product,
  User
}) => {
  //  Review.hasOne(Product) // check to see that the complement has been made -- consider belongTo -- KHND
  Review.belongsTo(User)
}
