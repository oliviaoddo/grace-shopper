'use strict'

const db = require('APP/db'),
  { ProductTag, ProductCategory, Product, Address, Category, LineItem, Order, Review, Tag, User, Promise } = db,
  { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
    orders: orders(),
    tags: tags()
  }

  seeded.addresses = addresses(seeded)
  seeded.reviews = reviews(seeded)
  seeded.lineItems = lineItems(seeded)
  seeded.categories = categories(seeded)
  seeded.productCategories = productCategories(seeded)
  seeded.productTags = productTags(seeded)

  return Promise.props(seeded)
}

const tags = seed(Tag, {
  tagA: {
    name: 'apples'
  },
  tagB: {
    name: 'oranges'
  },
  tagC: {
    name: 'bananas'
  },
  tagD: {
    name: 'advocados'
  },
  tagE: {
    name: 'coconuts'
  },
  tagF: {
    name: 'star fruits'
  },
  tagG: {
    name: 'durians'
  },
  tagH: {
    name: 'pineapples'
  }
})
const productTags = seed(ProductTag, ({
  products,
  tags
}) => ({
  pTA: {
    product_id: products.productA.id,
    tag_id: tags.tagA.id
  }
}))

const productCategories = seed(ProductCategory, ({
  products,
  categories
}) => ({
  pCA: {
    product_id: products.productA.id,
    category_id: categories.categoryA.id
  }
}))
const lineItems = seed(LineItem, ({
  products,
  orders
}) => ({
  lineItemA: {
    quantity: 10,
    price: 9.99,
    product_id: products.productA.id,
    order_id: orders.orderA.id
  },
  lineItemB: {
    quantity: 5,
    price: 19.99,
    product_id: products.productB.id,
    order_id: orders.orderA.id
  },
  lineItemC: {
    quantity: 2,
    price: 999.99,
    product_id: products.productC.id,
    order_id: orders.orderB.id
  },
  lineItemD: {
    quantity: 2,
    price: 999.99,
    product_id: products.productD.id,
    order_id: orders.orderB.id
  },
  lineItemE: {
    quantity: 4,
    price: 19.99,
    product_id: products.productE.id,
    order_id: orders.orderB.id
  },
  lineItemF: {
    quantity: 10,
    price: 5.22,
    product_id: products.productA.id,
    order_id: orders.orderC.id
  },
  lineItemG: {
    quantity: 8,
    price: 2.22,
    product_id: products.productB.id,
    order_id: orders.orderC.id
  },
  lineItemH: {
    quantity: 1,
    price: 9.12,
    product_id: products.productC.id,
    order_id: orders.orderD.id
  }
}))
const reviews = seed(Review, ({
  users,
  products
}) => ({
  reviewA: {
    title: 'Loren Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at augue semper, mollis urna eget, dictum mi. Etiam elit mi, commodo pharetra elit consequat, mollis rutrum ipsum. Nullam aliquet quam vitae congue facilisis. Morbi quis mattis diam, semper varius purus. Aliquam pellentesque iaculis varius. Fusce quis venenatis libero. Sed eget pellentesque arcu, sed vulputate leo. Ut venenatis dui egestas mauris pharetra, non placerat libero dignissim. In hac habitasse platea dictumst. Aliquam elit quam, tristique eu lacus quis, bibendum imperdiet dolor. Pellentesque lobortis dapibus porta. Vestibulum mollis turpis non turpis ullamcorper, vitae egestas lacus ullamcorper. Quisque nec ipsum magna. Quisque non ex sagittis, accumsan lacus nec, mollis diam. Nunc dapibus pretium justo quis facilisis. Praesent egestas velit lacinia elit sodales, vitae tincidunt nisl cursus.',
    rating: '2',
    product_id: products.productA.id,
    user_id: users.userA.id
  },
  reviewB: {
    title: 'Somethign',
    description: 'ssomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinsomethinomethin',
    rating: '4',
    product_id: products.productB.id,
    user_id: users.userB.id
  },
  reviewC: {
    title: 'hello',
    description: 'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello',
    rating: '5',
    product_id: products.productC.id,
    user_id: users.userC.id
  },
  reviewD: {
    title: 'mate',
    description: 'mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate mate',
    rating: '3',
    product_id: products.productD.id,
    user_id: users.userD.id
  },
  reviewE: {
    title: 'Who let the dogs out?',
    description: 'who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who? who?',
    rating: '1',
    product_id: products.productE.id,
    user_id: users.userE.id
  }
}))
const users = seed(User, {
  userA: {
    firstName: 'Jamie',
    lastName: 'Lynn',
    email: 'JamieLynn@example.com',
    password: 'whatIntheWorld599',
    isAdmin: false
  },
  userB: {
    firstName: 'Barack',
    lastName: 'Obama',
    email: 'BarackObama@example.gov',
    password: 'themaninthewhitehouse',
    isAdmin: false
  },
  userC: {
    firstName: 'Stanley',
    lastName: 'Tiu',
    email: 'StanleyTiu@example.gov',
    password: 'nospying1234pls',
    isAdmin: true
  },
  userD: {
    firstName: 'Lucky',
    lastName: 'The Leprachaun',
    email: 'AreForKids@example.gov',
    password: 'abc123',
    isAdmin: false
  },
  userE: {
    firstName: 'Count',
    lastName: 'Chocula',
    email: 'CountChocula@example.gov',
    password: 'chocolatechocolatechocolate',
    isAdmin: false
  },
  god: {
    firstName: 'god',
    lastName: 'god',
    email: 'god@god.god',
    password: 'godgodgodgod',
    isAdmin: true
  },
})

const products = seed(Product, {
  productA: {
    SKU: 'CNWG1',
    price: 25.00,
    name: 'Sea Glass Necklace: White Charm Gold Filled',
    details: `White Charm Necklace – Gold Filled. Made with a genuine piece of white sea glass from Laguna Beach, CA. Details: 14K Gold Filled -Freshwater pearl, Multiple chain lengths available, The model is wearing a 16 inch chain, Sea glass size: small, The shape, size, and shade of sea glass will vary slightly from necklace to necklace.`,
    description: `Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled.  Because of its  high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.`,
    inventory: 11,
    rating: 4.32,
    images: ['/images/necklaces/CNWG1-6.jpg', '/images/necklaces/CNWG1-17.jpg', '/images/necklaces/CNWG1-18.jpg', '/images/necklaces/CNWG1-99.jpg', '/images/necklaces/CNWG1-100.jpg', '/images/necklaces/CNWG1-1.jpg', '/images/necklaces/CNWG1-5.jpg']
  },
  productB: {
    SKU: 'CNGG2',
    price: 25.00,
    name: 'Sea Glass Necklace: Green Charm Gold Filled',
    details: `Green Charm Necklace – Gold Filled. Made with a genuine piece of white sea glass from Laguna Beach, CA. Details: 14K Gold Filled, Non-tarnish, Freshwater pearl, Multiple chain lengths available, Sea glass size: small, The shape, size, and shade of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: `Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled.  Because of its  high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.`,
    inventory: 12,
    rating: 4.29,
    images: ['/images/necklaces/CNGG2-1.jpg', '/images/necklaces/CNGG2-2.jpg', '/images/necklaces/CNGG2-3.jpg', '/images/necklaces/CNGG2-4.jpg', '/images/necklaces/CNGG2-5.jpg', '/images/necklaces/CNGG2-6.jpg', '/images/necklaces/CNGG2-7.jpg']
  },
  productC: {
    SKU: 'CNWS3',
    price: 24.00,
    name: 'Sea Glass Necklace: White Charm Silver Filled',
    details: `White Charm Necklace – Sterling Silver. Made with a genuine piece of white sea glass from Laguna Beach, CA. Details: Sterling Silver, Non-tarnish, Freshwater pearl, Multiple chain lengths available, Sea glass size: small, The shape, size, and shade of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled.  Because of its  high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 99,
    rating: 4.58,
    images: ['/images/necklaces/CNWS3-1.jpg', '/images/necklaces/CNWS3-2.jpg', '/images/necklaces/CNWS3-3.jpg', '/images/necklaces/CNWS3-4.jpg', '/images/necklaces/CNWS3-5.jpg', '/images/necklaces/CNWS3-6.jpg', '/images/necklaces/CNWS3-7.jpg']
  },
  productD: {
    SKU: 'CNGS4',
    price: 24.00,
    name: 'Sea Glass Necklace: Green Charm Silver Filled',
    details: `Green Charm Necklace – Sterling Silver. Made with a genuine piece of white sea glass from Laguna Beach, CA. Details: Sterling Silver, Non-tarnish, Freshwater pearl, Multiple chain lengths available, Sea glass size: small, The shape, size, and shade of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled.  Because of its  high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 3.49,
    images: ['/images/necklaces/CNGS4-1.jpg', '/images/necklaces/CNGS4-2.jpg', '/images/necklaces/CNGS4-3.jpg', '/images/necklaces/CNGS4-4.jpg', '/images/necklaces/CNGS4-5.jpg', '/images/necklaces/CNGS4-6.jpg', '/images/necklaces/CNGS4-7.jpg']
  }
})

const addresses = seed(Address,
  ({
    users
  }) => ({
    addressA: {
      street: '123 Fake Street',
      city: 'Fake City',
      zip: '12345',
      state: 'Maryland',
      country: 'FakeLand somewhere Fake',
      user_id: users.userA.id
    },
    addressB: {
      street: 'Something Something Broadway',
      street2: 'Columbia University',
      city: 'New York',
      zip: '10004',
      state: 'New York',
      country: 'United States',
      user_id: users.userB.id
    },
    addressC: {
      street: '1 Bikini Bottom',
      city: 'Bikini Bottom',
      zip: '12914',
      state: 'Tennessee',
      country: 'UnderWaterLand',
      user_id: users.userC.id

    },
    addressD: {
      street: '5 Power rangers',
      city: 'South Dakota',
      zip: '29193',
      state: 'Alabama',
      user_id: users.userD.id
    },
    addressE: {
      street: '21 David Yoon Court',
      city: 'GeorgiaCity',
      zip: '92810',
      state: 'Georgia',
      user_id: users.userE.id
    }
  }))

const categories = seed(Category, ({
  products
}) => ({
  categoryA: {
    name: 'asdfjkll',
  },
  categoryB: {
    name: 'Tomatoes',
  },
  categoryC: {
    name: 'Potatoes',
  },
  categoryD: {
    name: 'Colby-Jack',
  },
  categoryE: {
    name: 'right',
  },
  categoryF: {
    name: 'wrong',
  },
  categoryG: {
    name: 'yes',
  },
  categoryH: {
    name: 'no',
  },
  categoryI: {
    name: 'Australian',
  },
  categoryJ: {
    name: 'European',
  },
}))

const orders = seed(Order, {
  orderA: {
    status: 'cart'
  },
  orderB: {
    checkoutDateTime: 1501183231701,
    status: 'pending'
  },
  orderC: {
    checkoutDateTime: 1501183672370,
    status: 'pending'
  },
  orderD: {
    checkoutDateTime: 1298310298489,
    status: 'pending'
  },
  orderE: {
    checkoutDateTime: 1209812039812,
    status: 'pending'
  },
  orderF: {
    status: 'cart'
  },
  orderG: {
    status: 'cart'
  },
})

if (module === require.main) {
  db.didSync
    .then(() => db.sync({
      force: true
    }))
    .then(seedEverything)
    .catch((err) => console.log(err))
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
          // Is other a function? If so, call it. Otherwise, leave it alone.
          typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
        .map(key => {
          const row = rows[key]
          return {
            key,
            value: Promise.props(row)
              .then(row => Model.create(row)
                .catch(error => {
                  throw new BadRow(key, row, error)
                })
              )
          }
        }).reduce(
          (all, one) => Object.assign({}, all, {
            [one.key]: one.value
          }), {}
        )
      ))
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {
  users,
  addresses,
  orders,
  categories,
  products,
  reviews
})
