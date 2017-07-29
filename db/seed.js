'use strict'

const db = require('APP/db'),
  { Product, Address, Category, LineItem, Order, Review, Tag, User, Promise } = db,
  { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
    categories: categories(),
    orders: orders()
  }

  seeded.addresses = addresses(seeded)
  seeded.reviews = reviews(seeded)

  return Promise.props(seeded)
}
const reviews = seed(Review,({users, products})=> ({
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
    SKU: 'S15N-Clam-SR',
    price: 9.99,
    name: 'a necklace or something',
    description: 'see the title?',
    inventory: 11,
    rating: 4.32
  },
  productB: {
    SKU: 'F17B-Lobster-LR',
    price: 29.99,
    name: 'A bracelet made from a lobster?',
    description: 'who even thinks to make something from a Lobster???',
    inventory: 1,
    rating: 2.29
  },
  productC: {
    SKU: 'W15B-Mermaid-MB',
    price: 319.24,
    name: 'Mermaid Brooch',
    description: 'Do mermaids exist? Where did they even find the material to make this mermaid? I am going to drone on for a bit to see how the description fairs with a relatively long description of something or a another but it really doesn\'t really matter what I am typing All my friends are dead and stuff cuz that was what Sid was wearing at the time. I think I\'m about done typing about stupid stuff.',
    inventory: 99,
    rating: 4.58
  },
  productD: {
    SKU: 'F15N-Clam-LW',
    price: 0.99,
    name: 'Clam Necklace',
    description: 'A literal living clam hanging from your neck. How cool is that?',
    inventory: 2,
    rating: 2.49
  },
  productE: {
    SKU: 'H15R-Sponge-SZ',
    price: 199.99,
    name: 'Sponge Ring',
    description: 'What kind of weird person would shop at this store? Make sure to get plenty of manicures to prevent your living sponge ring from drying out.',
    inventory: 9,
    rating: 1.32
  },
})

const addresses = seed(Address,
  ({ users }) => ({
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

const categories = seed(Category, {
  categoryA: {
    name: 'asdfjkll'
  },
  categoryB: {
    name: 'Tomatoes'
  },
  categoryC: {
    name: 'Potatoes'
  },
  categoryD: {
    name: 'Colby-Jack'
  },
  categoryE: {
    name: 'right'
  },
  categoryF: {
    name: 'wrong'
  },
  categoryG: {
    name: 'yes'
  },
  categoryH: {
    name: 'no'
  },
  categoryI: {
    name: 'Australian'
  },
  categoryJ: {
    name: 'European'
  },
})

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

/*
 *const reviews = seed(Review, {
 *  reviewA: {
 *    title: 'Wow what a great product!',
 *    description: 'I really love the feel of real mermaid skin against my own skin. Faux mermaid skin makes my skin feel scratchy. Quality is nice, ordered and got my item within 20 days. 5 stars from me.',
 *    rating: 5
 *  },
 *  reviewB: {
 *    title: 'WORST PRODUCT EVER',
 *    description: 'Ask yourself this: Do I REALLY need a lobster shell necklace? Of COURSE I do. I can\'t believe that anyone would need to ask themselves this question when in fact it is exactly that! My Lobster shell necklace broke a couple days later. They get a solid 1/5 from me',
 *    rating: 1
 *  },
 *  reviewC: {
 *    title: 'Can I even find this anywhere else?',
 *    description: 'When I look to buy something that is weird and a horrible gift, Ocean Spray is the first thing that comes to mind! All the gifts here are magnificently and horribly crafted with detail and negligence. Quite frankly, I\'m not even sure if I know why I love or hate this store so much!',
 *    rating: 3
 *  },
 *  reviewD: {
 *    title: 'pretty good',
 *    description: 'cool items',
 *    rating: 3
 *  },
 *  reviewE: {
 *    title: 'Mom is allergic to swordfish',
 *    description: 'After buying a gift for my mother for Mother\'s Day, she swelled up to the size of a blueberry after she put her authentic \'Seaweed\' brooch on. The only seafood she is allergic to is swordfish. I am going to sue this company for the hospital and legal fees.',
 *    rating: 1
 *  },
 *  reviewF: {
 *    title: 'I am low-vision impaired and I accessed this site by tabbing',
 *    description: 'I am so glad that your website is handicapped enabled. All my favorite websites are so hard to use but not this one!',
 *    rating: 5
 *  },
 *})
 */

/*
 *const favorites = seed(Favorite,
 *  ({
 *    users,
 *    things
 *  }) => ({
 *    'obama loves surfing': {
 *      user_id: users.barack.id, // users.barack is an instance of the User model
 *      thing_id: things.surfing.id // Same thing for things.
 *    },
 *    'god is into smiting': {
 *      user_id: users.god.id,
 *      thing_id: things.smiting.id
 *    },
 *    'obama loves puppies': {
 *      user_id: users.barack.id,
 *      thing_id: things.puppies.id
 *    },
 *    'god loves puppies': {
 *      user_id: users.god.id,
 *      thing_id: things.puppies.id
 *    },
 *  }))
 */

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
