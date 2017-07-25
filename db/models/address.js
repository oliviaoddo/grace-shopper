const { STRING } = require('sequelize');

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
  zip: {
    type: STRING,
    allowNull: false
  },
  state: {
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
  Address.hasMany(User)
}
