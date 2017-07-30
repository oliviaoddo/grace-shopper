const { STRING, ENUM } = require('sequelize')

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
    type: STRING(5),
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  state: {
    type: ENUM,
    values: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    allowNull: false
  },
  country: {
    type: STRING,
    allowNull: false,
    defaultValue: 'United States'
  }
})

module.exports.associations = (Address, {User}) => {
  Address.belongsTo(User)
}
