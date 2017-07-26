const { STRING } = require('sequelize')

module.exports = db => db.define('addresses', {
  street: {
    type: STRING,
    allowNull: false
  },
  street2: {
    type: STRING,
  },
  city: {
    type: STRING,
    allowNull: false
  },
  zip: { //length 5, hook that on create/update ensured only numbers -- KHND
    type: STRING,
    allowNull: false
  },
  state: { // ENUM; AND I understand not making that -- KHND
    type: STRING,
    allowNull: false
  },
  country: {
    type: STRING,
    allowNull: false,
    defaultValue: 'United States of America'
  }
})

module.exports.associations = (Address, {
  User
}) => {
  Address.hasMany(User) // consider belongsTo -- KHND
}
