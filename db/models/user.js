'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs'),
  { STRING, VIRTUAL } = require('sequelize')

module.exports = db => db.define('users', {
  firstName: STRING,
  lastName: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{
    fields: ['email'],
    unique: true
  }],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    attributes: {
      exclude: ['password_digest']
    }
  },
  getterMethods: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    }
  }
})

// USER ASSOCIATION IS LOCATED IN THE ADDRESS TABLE, but I'll make one here just in case
module.exports.associations = (User, {
  OAuth,
  Address
}) => {
  User.hasOne(OAuth)
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
