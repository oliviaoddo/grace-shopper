{ STRING, INTEGER } = require('sequelize');

module.exports = db => db.define('addresses', {
  street: {
      type: STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    street2: {
      type: STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    city: {
      type: STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    zip: {
      type: INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    state: {
      type: STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    country: {
      type: STRING,
      allowNull: false
    }
  })

  module.exports.associations = (Address, {
    User
  }) => {
    Address.hasMany(User)
  }
