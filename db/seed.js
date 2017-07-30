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
    name: 'Sea Glass Necklace: White Charm Sterling Silver',
    details: `White Charm Necklace – Sterling Silver. Made with a genuine piece of white sea glass from Laguna Beach, CA. Details: Sterling Silver, Non-tarnish, Freshwater pearl, Multiple chain lengths available, Sea glass size: small, The shape, size, and shade of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled.  Because of its  high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 99,
    rating: 4.58,
    images: ['/images/necklaces/CNWS3-1.jpg', '/images/necklaces/CNWS3-2.jpg', '/images/necklaces/CNWS3-3.jpg', '/images/necklaces/CNWS3-4.jpg', '/images/necklaces/CNWS3-5.jpg', '/images/necklaces/CNWS3-6.jpg', '/images/necklaces/CNWS3-7.jpg']
  },
  productD: {
    SKU: 'CNGS4',
    price: 24.00,
    name: 'Sea Glass Necklace: Green Charm Sterling Silver',
    details: `Green Charm Necklace – Sterling Silver. Made with a genuine piece of white sea glass from Laguna Beach, CA. Details: Sterling Silver, Non-tarnish, Freshwater pearl, Multiple chain lengths available, Sea glass size: small, The shape, size, and shade of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled.  Because of its  high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 3.49,
    images: ['/images/necklaces/CNGS4-1.jpg', '/images/necklaces/CNGS4-2.jpg', '/images/necklaces/CNGS4-3.jpg', '/images/necklaces/CNGS4-4.jpg', '/images/necklaces/CNGS4-5.jpg', '/images/necklaces/CNGS4-6.jpg', '/images/necklaces/CNGS4-7.jpg']
  },
  productH: {
    SKU: 'CNSG5',
    price: 24.00,
    name: 'Sea Glass Necklace: Seafoam Charm Gold Filled',
    details: `Sea Glass Necklace: Seafoam Charm Gold Filled. Made with a genuine piece of seafoam sea glass from Laguna Beach, CA. Details: 14K gold filled, Non-tarnish, 14k gold filled charm, Freshwater pearl, Multiple chain lengths available, Sea glass shape, size, and shade with vary slightly from necklace to necklace`,
    description: 'Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 4.50,
    images: ['/images/necklaces/CNSG5-1.jpg', '/images/necklaces/CNSG5-2.jpg']
  },
  productI: {
    SKU: 'CNSS6',
    price: 24.00,
    name: 'Sea Glass Necklace: Seafoam Charm Sterling Silver',
    details: `Sea Glass Necklace: Seafoam Charm. Made with a genuine piece of seafoam sea glass from Laguna Beach, CA. Details: Sterling silver filled, Non-tarnish, Sterling silver charm, Freshwater pearl, Multiple chain lengths available, Sea glass size, shape, and shade will vary slightly from necklace to necklace`,
    description: 'Our most classic sea glass necklace the charm necklace is a hallmark of Sea Candy Jewelry. We start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. This piece of sea glass is hand selected to ensure it is free of flaws and is at least 25 to 50 years old. The piece is carefully drilled with state of the art glass drilling equipment. Thin wire is then delicately wrapped around the sea glass in order to give it a touch of elegance. The wrapped sea glass is accompanied by a fresh water pearl and a charm on a dainty chain. Every element of this necklace is completely sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 4.00,
    images: ['/images/necklaces/CNSS6-1.jpg', '/images/necklaces/CNSS6-2.jpg', '/images/necklaces/CNSS6-3.jpg']
  },
  productE: {
    SKU: 'SNGG5',
    price: 24.00,
    name: 'Sea Glass Necklace: Green Stack Gold Filled',
    details: `Green Stack. Made with three genuine pieces of green sea glass from Laguna Beach, CA. Details: 14k Gold filled, 14k Gold filled charm, Freshwater pearl, Multiple chain lengths available, The sizes, shapes, and shades of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'The stack necklace is perhaps one of our most creative necklace styles. We start out with three pristine pebble shaped pieces of sea glass that were found in beautiful Laguna Beach, CA. These pieces of glass were hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The drilled sea glass is stacked onto a hand made head pin. The sea glass stack is accompanied by a fresh water pearl and a beach inspired charm. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 4.00,
    images: ['/images/necklaces/SNGG5-1.jpg', '/images/necklaces/SNGG5-2.jpg', '/images/necklaces/SNGG5-3.jpg', '/images/necklaces/SNGG5-4.jpg', '/images/necklaces/SNGG5-5.jpg']
  },
  productF: {
    SKU: 'SNWG1',
    price: 25.00,
    name: 'Sea Glass Necklace: White Stack Gold Filled',
    details: `White Stack. Made with three genuine pieces of white sea glass from Laguna Beach, CA. Details: 14k Gold filled, 14k Gold filled charm, Freshwater pearl, Multiple chain lengths available, The sizes, shapes, and shades of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'The stack necklace is perhaps one of our most creative necklace styles. We start out with three pristine pebble shaped pieces of sea glass that were found in beautiful Laguna Beach, CA. These pieces of glass were hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The drilled sea glass is stacked onto a hand made head pin. The sea glass stack is accompanied by a fresh water pearl and a beach inspired charm. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 12,
    rating: 3.49,
    images: ['/images/necklaces/SNWG1-1.jpg', '/images/necklaces/SNWG1-2.jpg', '/images/necklaces/SNWG1-3.jpg', '/images/necklaces/SNWG1-4.jpg', '/images/necklaces/SNWG1-5.jpg', '/images/necklaces/SNWG1-6.jpg']
  },
  productG: {
    SKU: 'SNSG2',
    price: 35.00,
    name: 'Sea Glass Necklace: Seafoam Stack Gold Filled',
    details: `Seafoam Stack. Made with three genuine pieces of seafoam sea glass from Laguna Beach, CA. Details: 14k Gold filled, 14k Gold filled charm, Freshwater pearl, Multiple chain lengths available, The sizes, shapes, and shades of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'The stack necklace is perhaps one of our most creative necklace styles. We start out with three pristine pebble shaped pieces of sea glass that were found in beautiful Laguna Beach, CA. These pieces of glass were hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The drilled sea glass is stacked onto a hand made head pin. The sea glass stack is accompanied by a fresh water pearl and a beach inspired charm. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 3.49,
    images: ['/images/necklaces/SNSG2-1.jpg', '/images/necklaces/SNSG2-2.jpg', '/images/necklaces/SNSG2-3.jpg', '/images/necklaces/SNSG2-4.jpg', '/images/necklaces/SNSG2-5.jpg']
  },
  productJ: {
    SKU: 'SNSS3',
    price: 35.00,
    name: 'Sea Glass Necklace: Seafoam Stack Gold Filled',
    details: `Seafoam Stack. Made with three genuine pieces of seafoam sea glass from Laguna Beach, CA. Details: Sterling Silver, Sterling silver charm, Freshwater pearl, Multiple chain lengths available, The sizes, shapes, and shades of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'The stack necklace is perhaps one of our most creative necklace styles. We start out with three pristine pebble shaped pieces of sea glass that were found in beautiful Laguna Beach, CA. These pieces of glass were hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The drilled sea glass is stacked onto a hand made head pin. The sea glass stack is accompanied by a fresh water pearl and a beach inspired charm. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 4.49,
    images: ['/images/necklaces/SNSS3-1.jpg', '/images/necklaces/SNSS3-2.jpg', '/images/necklaces/SNSS3-3.jpg', '/images/necklaces/SNSS3-4.jpg', '/images/necklaces/SNSS3-5.jpg', '/images/necklaces/SNSS3-6.jpg']
  },
  productK: {
    SKU: 'SNGS4',
    price: 25.00,
    name: 'Sea Glass Necklace: Green Stack Sterling Silver',
    details: `Green Stack. Made with three genuine pieces of green sea glass from Laguna Beach, CA. Details: Sterling Silver, Sterling silver charm, Freshwater pearl, Multiple chain lengths available, The sizes, shapes, and shades of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'The stack necklace is perhaps one of our most creative necklace styles. We start out with three pristine pebble shaped pieces of sea glass that were found in beautiful Laguna Beach, CA. These pieces of glass were hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The drilled sea glass is stacked onto a hand made head pin. The sea glass stack is accompanied by a fresh water pearl and a beach inspired charm. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 4.49,
    images: ['/images/necklaces/SNGS4-1.jpg', '/images/necklaces/SNGS4-2.jpg', '/images/necklaces/SNGS4-3.jpg', '/images/necklaces/SNGS4-4.jpg', '/images/necklaces/SNGS4-5.jpg', '/images/necklaces/SNGS4-6.jpg']
  },
  productL: {
    SKU: 'SNWS6',
    price: 25.00,
    name: 'Sea Glass Necklace: Green Stack Sterling Silver',
    details: `White Stack. Made with three genuine pieces of white sea glass from Laguna Beach, CA. Details: Sterling Silver, Sterling silver charm, Freshwater pearl, Multiple chain lengths available, The sizes, shapes, and shades of sea glass will vary slightly from necklace to necklace, The model is wearing a 16 inch chain`,
    description: 'The stack necklace is perhaps one of our most creative necklace styles. We start out with three pristine pebble shaped pieces of sea glass that were found in beautiful Laguna Beach, CA. These pieces of glass were hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The drilled sea glass is stacked onto a hand made head pin. The sea glass stack is accompanied by a fresh water pearl and a beach inspired charm. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 2,
    rating: 4.49,
    images: ['/images/necklaces/SNWS6-1.jpg', '/images/necklaces/SNWS6-2.jpg', '/images/necklaces/SNWS6-3.jpg', '/images/necklaces/SNWS6-4.jpg', '/images/necklaces/SNWS6-5.jpg', '/images/necklaces/SNWS6-6.jpg']
  },
  productM: {
    SKU: 'BNGG1',
    price: 25.00,
    name: 'Sea Glass Necklace: Green Bar Gold Filled',
    details: `Green Bar Necklace. Made with four genuine pieces of green sea glass from Laguna Beach, CA. Details: 14k Gold filled, Japanese glass beads, The sizes, colors, and shapes of sea glass will vary slightly from necklace to necklacem, Multiple chain lengths available, The model is wearing a 16 inch chain`,
    description: 'The bar necklace is the newest edition to our line of dainty sea glass necklaces. We start out with 4 pristine uniquely shaped pieces of sea glass that are found in beautiful Laguna Beach, CA. These pieces of glass are hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The sea glass accompanied by small golden beads are stacked onto a hand made head pin. Lastly, we attach a high quality chain to both sides of the bar in the size of your choice. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/necklaces/BNGG1-1.jpg', '/images/necklaces/BNGG1-2.jpg', '/images/necklaces/BNGG1-3.jpg', '/images/necklaces/BNGG1-4.jpg', '/images/necklaces/BNGG1-5.jpg', '/images/necklaces/BNGG1-6.jpg']
  },
  productN: {
    SKU: 'BNSG2',
    price: 35.00,
    name: 'Sea Glass Necklace: Seafoam Bar Gold Filled',
    details: `Green Bar Necklace. Made with four genuine pieces of green sea glass from Laguna Beach, CA. Details: 14k Gold filled, Japanese glass beads, The sizes, colors, and shapes of sea glass will vary slightly from necklace to necklacem, Multiple chain lengths available, The model is wearing a 16 inch chain`,
    description: 'The bar necklace is the newest edition to our line of dainty sea glass necklaces. We start out with 4 pristine uniquely shaped pieces of sea glass that are found in beautiful Laguna Beach, CA. These pieces of glass are hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The sea glass accompanied by small golden beads are stacked onto a hand made head pin. Lastly, we attach a high quality chain to both sides of the bar in the size of your choice. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/necklaces/BNGG1-1.jpg', '/images/necklaces/BNGG1-2.jpg', '/images/necklaces/BNGG1-3.jpg', '/images/necklaces/BNGG1-4.jpg', '/images/necklaces/BNGG1-5.jpg']
  },
  productO: {
    SKU: 'BNWG3',
    price: 24.00,
    name: 'Sea Glass Necklace: White Bar Gold Filled',
    details: `White Bar Necklace. Made with four genuine pieces of white sea glass from Laguna Beach, CA. Details: 14k Gold filled, Japanese glass beads, The sizes, colors, and shapes of sea glass will vary slightly from necklace to necklace, Multiple chain lengths available, The model is wearing a 16 inch chain`,
    description: 'The bar necklace is the newest edition to our line of dainty sea glass necklaces. We start out with 4 pristine uniquely shaped pieces of sea glass that are found in beautiful Laguna Beach, CA. These pieces of glass are hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The sea glass accompanied by small golden beads are stacked onto a hand made head pin. Lastly, we attach a high quality chain to both sides of the bar in the size of your choice. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/necklaces/BNWG3-1.jpg', '/images/necklaces/BNWG3-2.jpg', '/images/necklaces/BNWG3-3.jpg', '/images/necklaces/BNWG3-4.jpg']
  },
  productP: {
    SKU: 'BNWS4',
    price: 24.00,
    name: 'Sea Glass Necklace: White Bar Sterling Silver',
    details: `White Bar Necklace. Made with four genuine pieces of white sea glass from Laguna Beach, CA. Details: Sterling Silver, Japanese glass beads, The sizes, colors, and shapes of sea glass will vary slightly from necklace to necklace, Multiple chain lengths available, The model is wearing a 16 inch chain`,
    description: 'The bar necklace is the newest edition to our line of dainty sea glass necklaces. We start out with 4 pristine uniquely shaped pieces of sea glass that are found in beautiful Laguna Beach, CA. These pieces of glass are hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The sea glass accompanied by small golden beads are stacked onto a hand made head pin. Lastly, we attach a high quality chain to both sides of the bar in the size of your choice. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/necklaces/BNWS4-1.jpg', '/images/necklaces/BNWS4-2.jpg', '/images/necklaces/BNWS4-3.jpg', '/images/necklaces/BNWS4-4.jpg']
  },
  productQ: {
    SKU: 'BNSS5',
    price: 35.00,
    name: 'Sea Glass Necklace: Seafoam Bar Sterling Silver',
    details: `Seafoam Bar Necklace. Made with four genuine pieces of seafoam sea glass from Laguna Beach, CA. Details: Sterling Silver, Japanese glass beads, The sizes, colors, and shapes of sea glass will vary slightly from necklace to necklace, Multiple chain lengths available, The model is wearing a 16 inch chain`,
    description: 'The bar necklace is the newest edition to our line of dainty sea glass necklaces. We start out with 4 pristine uniquely shaped pieces of sea glass that are found in beautiful Laguna Beach, CA. These pieces of glass are hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The sea glass accompanied by small golden beads are stacked onto a hand made head pin. Lastly, we attach a high quality chain to both sides of the bar in the size of your choice. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/necklaces/BNSS5-1.jpg', '/images/necklaces/BNSS5-2.jpg', '/images/necklaces/BNSS5-3.jpg', '/images/necklaces/BNSS5-4.jpg', '/images/necklaces/BNSS5-5.jpg']
  },
  productR: {
    SKU: 'BNGS6',
    price: 23.00,
    name: 'Sea Glass Necklace: Green Bar Sterling Silver',
    details: `Green Bar Necklace. Made with four genuine pieces of green sea glass from Laguna Beach, CA. Details: Sterling Silver, Japanese glass beads, The sizes, colors, and shapes of sea glass will vary slightly from necklace to necklace, Multiple chain lengths available, The model is wearing a 16 inch chain`,
    description: 'The bar necklace is the newest edition to our line of dainty sea glass necklaces. We start out with 4 pristine uniquely shaped pieces of sea glass that are found in beautiful Laguna Beach, CA. These pieces of glass are hand selected to ensure they are free of flaws and are at least 25 to 50 years old. The glass is then carefully drilled with state of the art glass drilling equipment. The sea glass accompanied by small golden beads are stacked onto a hand made head pin. Lastly, we attach a high quality chain to both sides of the bar in the size of your choice. Every metal component of this sea glass necklace is either gold filled or sterling silver. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/necklaces/BNGS6-1.jpg', '/images/necklaces/BNGS6-2.jpg', '/images/necklaces/BNGS6-3.jpg', '/images/necklaces/BNGS6-4.jpg', '/images/necklaces/BNGS6-5.jpg']
  },
  productS: {
    SKU: 'RGS1',
    price: 19.00,
    name: 'Sea Glass Ring: Green Sterling Silver',
    details: `Sea Glass Ring, This ring was made with a genuine piece of green sea glass from Laguna Beach, CA. Details: Sterling silver band, Wrapped in sterling silver wire, Non-tarnish, The shape, size, and shade of the sea glass will vary slightly from ring to ring.`,
    description: 'The sea glass ring is one of our best selling products because it is trendy and affordable. The ring features a hand picked piece of sea glass that was found in beautiful Laguna Beach, CA. The piece of sea glass is at least 25-50 years old and in some cases up to 100 years old. We use a thin wire to secure the sea glass onto our hand made ring band. Both the ring band and the wire are either sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will not tarnish or fade and stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/rings/RGS1-1.jpg', '/images/rings/RGS1-2.jpg', '/images/rings/RGS1-3.jpg', '/images/rings/RGS1-4.jpg']
  },
  productT: {
    SKU: 'RWS2',
    price: 19.00,
    name: 'Sea Glass Ring: White Sterling Silver',
    details: `Sea Glass Ring. This ring was made with a genuine piece of white sea glass from Laguna Beach, CA. Details: Sterling silver band, Wrapped in sterling silver wire, Non-tarnish, The shape, size, and shade of the sea glass will vary slightly from ring to ring.`,
    description: 'The sea glass ring is one of our best selling products because it is trendy and affordable. The ring features a hand picked piece of sea glass that was found in beautiful Laguna Beach, CA. The piece of sea glass is at least 25-50 years old and in some cases up to 100 years old. We use a thin wire to secure the sea glass onto our hand made ring band. Both the ring band and the wire are either sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will not tarnish or fade and stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/rings/RWS2-1.jpg', '/images/rings/RWS2-2.jpg', '/images/rings/RWS2-3.jpg', '/images/rings/RWS2-4.jpg']
  },
  productU: {
    SKU: 'RWG3',
    price: 20.00,
    name: 'Sea Glass Ring: White Gold Filled',
    details: `Sea Glass Ring. This ring was made with a genuine piece of white sea glass from Laguna Beach, CA. Details: 14K gold filled band, Wrapped in 14K gold filled wire, Non-tarnish, The shape, size, and shade of the sea glass will vary slightly from ring to ring.`,
    description: 'The sea glass ring is one of our best selling products because it is trendy and affordable. The ring features a hand picked piece of sea glass that was found in beautiful Laguna Beach, CA. The piece of sea glass is at least 25-50 years old and in some cases up to 100 years old. We use a thin wire to secure the sea glass onto our hand made ring band. Both the ring band and the wire are either sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will not tarnish or fade and stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/rings/RWG3-1.jpg', '/images/rings/RWG3-2.jpg', '/images/rings/RWG3-3.jpg', '/images/rings/RWG3-4.jpg']
  },
  productW: {
    SKU: 'RGG4',
    price: 20.00,
    name: 'Sea Glass Ring: Green Gold Filled',
    details: `Sea Glass Ring, This ring was made with a genuine piece of green sea glass from Laguna Beach, CA. Details: 14K gold filled band, Wrapped in 14K gold filled wire, Non-tarnish, The shape, size, and shade of the sea glass will vary slightly from ring to ring.`,
    description: 'The sea glass ring is one of our best selling products because it is trendy and affordable. The ring features a hand picked piece of sea glass that was found in beautiful Laguna Beach, CA. The piece of sea glass is at least 25-50 years old and in some cases up to 100 years old. We use a thin wire to secure the sea glass onto our hand made ring band. Both the ring band and the wire are either sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will not tarnish or fade and stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/rings/RGG4-1.jpg', '/images/rings/RGG4-2.jpg', '/images/rings/RGG4-3.jpg', '/images/rings/RGG4-4.jpg']
  },
  productX: {
    SKU: 'RSG5',
    price: 34.00,
    name: 'Sea Glass Ring: Seafoam Gold Filled',
    details: `Sea Glass Ring. This ring was made with a genuine piece of seafoam sea glass from Laguna Beach, CA. Details: 14K gold filled band, Wrapped in 14K gold filled wire, Non-tarnish, The shape, size, and shade of the sea glass will vary slightly from ring to ring.`,
    description: 'The sea glass ring is one of our best selling products because it is trendy and affordable. The ring features a hand picked piece of sea glass that was found in beautiful Laguna Beach, CA. The piece of sea glass is at least 25-50 years old and in some cases up to 100 years old. We use a thin wire to secure the sea glass onto our hand made ring band. Both the ring band and the wire are either sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will not tarnish or fade and stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/rings/RSG5-1.jpg', '/images/rings/RSG5-2.jpg', '/images/rings/RSG5-3.jpg', '/images/rings/RSG5-4.jpg']
  },
  productY: {
    SKU: 'RSS6',
    price: 34.00,
    name: 'Sea Glass Ring: Seafoam Sterling Silver',
    details: `Sea Glass Ring. This ring was made with a genuine piece of seafoam sea glass from Laguna Beach, CA. Details: Sterling silver band, Wrapped in sterling silver wire, Non-tarnish, The shape, size, and shade of the sea glass will vary slightly from ring to ring.`,
    description: 'The sea glass ring is one of our best selling products because it is trendy and affordable. The ring features a hand picked piece of sea glass that was found in beautiful Laguna Beach, CA. The piece of sea glass is at least 25-50 years old and in some cases up to 100 years old. We use a thin wire to secure the sea glass onto our hand made ring band. Both the ring band and the wire are either sterling silver or gold filled. Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will not tarnish or fade and stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/rings/RSS6-1.jpg', '/images/rings/RSS6-2.jpg', '/images/rings/RSS6-3.jpg', '/images/rings/RSS6-4.jpg']
  },
  product1: {
    SKU: 'WBLG1',
    price: 28.00,
    name: 'Sea Glass Bracelet: Green Light Wood',
    details: `Ivory Wood Stretch Bracelet – Green. Made with seven genuine pieces of sea glass from Laguna Beach, CA. Details: Measures 7 inches (standard bracelet size), Stretch bracelet, 4 green pieces of sea glass, 3 white pieces of sea glass, Dyed wood waxed beads, The sizes, shapes, and shades of sea glass will vary slightly from bracelet to bracelet, Made with elastic bead cord`,
    description: 'Our beachiest sea glass bracelet, the wood bead bracelet, lets you bring the beachy vibes where ever you go. It consists of two wooden bead bracelets; one with sea glass and the other without. The wood beads are hand cut, dyed, and waxed in the Philippines. Yes, we said hand cut! No machines were used in the making of these beads, a human being hand cut each and every one. These beads are strung onto elastic cord along with 7 pristine pieces of sea glass that were found in Laguna Beach, CA. These pieces of sea glass are at least 25-50 years old and are hand selected to ensure they free of flaws. The combination of natural wood and natural sea glass create a natural, beach inspired look.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/WBLG1-1.jpg', '/images/bracelets/WBLG1-2.jpg', '/images/bracelets/WBLG1-3.jpg']
  },
  product2: {
    SKU: 'WBDG2',
    price: 28.00,
    name: 'Sea Glass Bracelet: Green Dark Wood',
    details: `Brown Sea Glass Bracelet, Made with seven genuine pieces of sea glass from Laguna Beach, CA. Details: Measures 7 inches (standard bracelet size), Stretch bracelet, 4 white pieces of sea glass, 3 green pieces of sea glass, Dyed Wood Waxed Beads, The sizes, shapes, and shades of sea glass will vary slightly from bracelet to bracelet, Made with elastic bead cord`,
    description: 'Our beachiest sea glass bracelet, the wood bead bracelet, lets you bring the beachy vibes where ever you go. It consists of two wooden bead bracelets; one with sea glass and the other without. The wood beads are hand cut, dyed, and waxed in the Philippines. Yes, we said hand cut! No machines were used in the making of these beads, a human being hand cut each and every one. These beads are strung onto elastic cord along with 7 pristine pieces of sea glass that were found in Laguna Beach, CA. These pieces of sea glass are at least 25-50 years old and are hand selected to ensure they free of flaws. The combination of natural wood and natural sea glass create a natural, beach inspired look.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/WBDG2-1.jpg', '/images/bracelets/WBDG2-2.jpg', '/images/bracelets/WBDG2-3.jpg']
  },
  product3: {
    SKU: 'WBLS3',
    price: 34.00,
    name: 'Sea Glass Bracelet: Seafoam Light Wood',
    details: `Ivory Sea Glass Bracelet. Made with seven genuine pieces of sea glass from Laguna Beach, CA. Details: Measures 7 inches (standard bracelet size), Stretch bracelet, 4 white pieces of sea glass, 3 seafoam pieces of sea glass, Dyed wood waxed beads, The sizes, shapes, and shades of sea glass will vary slightly from bracelet to bracelet, Made with elastic bead cord`,
    description: 'Our beachiest sea glass bracelet, the wood bead bracelet, lets you bring the beachy vibes where ever you go. It consists of two wooden bead bracelets; one with sea glass and the other without. The wood beads are hand cut, dyed, and waxed in the Philippines. Yes, we said hand cut! No machines were used in the making of these beads, a human being hand cut each and every one. These beads are strung onto elastic cord along with 7 pristine pieces of sea glass that were found in Laguna Beach, CA. These pieces of sea glass are at least 25-50 years old and are hand selected to ensure they free of flaws. The combination of natural wood and natural sea glass create a natural, beach inspired look.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/WBLS3-1.jpg', '/images/bracelets/WBLS3-2.jpg', '/images/bracelets/WBLS3-3.jpg']
  },
  product4: {
    SKU: 'WBDS4',
    price: 34.00,
    name: 'Sea Glass Bracelet: Seafoam Dark Wood',
    details: `Brown Sea Glass Bracelet. Made with seven genuine pieces of sea glass from Laguna Beach, CA. Details: Measures 7 inches (standard bracelet size), Stretch bracelet, 4 white pieces of sea glass, 3 seafoam pieces of sea glass, Dyed Wood Waxed Beads, The sizes, shapes, and shades of sea glass will vary slightly from bracelet to bracelet, Made with elastic bead cord.`,
    description: 'Our beachiest sea glass bracelet, the wood bead bracelet, lets you bring the beachy vibes where ever you go. It consists of two wooden bead bracelets; one with sea glass and the other without. The wood beads are hand cut, dyed, and waxed in the Philippines. Yes, we said hand cut! No machines were used in the making of these beads, a human being hand cut each and every one. These beads are strung onto elastic cord along with 7 pristine pieces of sea glass that were found in Laguna Beach, CA. These pieces of sea glass are at least 25-50 years old and are hand selected to ensure they free of flaws. The combination of natural wood and natural sea glass create a natural, beach inspired look.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/WBDS4-1.jpg', '/images/bracelets/WBDS4-2.jpg', '/images/bracelets/WBDS4-3.jpg']
  },
  product5: {
    SKU: 'SBAG1',
    price: 34.00,
    name: 'Sea Glass Bracelet: Aqua Stretch Gold Filled',
    details: `Aqua Beaded Stretch Bracelets. Made with a genuine white piece of sea glass from Laguna Beach, CA. Description: Set of 2 bracelets, Gold filled charms, Aqua mountain jade beads, 7 inches in length (standard bracelet size), Sea glass size: x-small, Made with elastic bead cord, The size, shape, and shade of sea glass will vary slightly from bracelet to bracelet`,
    description: 'Our most popular sea glass bracelet, the beaded stretch bracelet, is the perfect accessory to any outfit. It consists of two bracelets; one with sea glass and a starfish charm, and the other with a beach inspired charm of your choice. For the first sea glass bracelet we start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. The sea glass is at least 25-50 years old and is hand selected to make sure it is free of flaws and fully aged. The glass is then carefully drilled with state of the art glass drilling equipment. After being drilled, the sea glass is delicately wrapped in thin wire to give it a touch of elegance. The wire wrapped sea glass is accompanied by a starfish charm on an elastic cord. Dyed marble beads are used, which are commonly called Mountain Jade Beads.  Lastly, another bracelet is made with smaller beads and a beach inspired charm. Together, these two bracelets make the perfect set! Every metal element on these bracelets is either gold filled or sterling silver.  Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/SBAG1-1.jpg', '/images/bracelets/SBAG1-2.jpg', '/images/bracelets/SBAG1-3.jpg']
  },
  product6: {
    SKU: 'SBTG2',
    price: 34.00,
    name: 'Sea Glass Bracelet: Teal Stretch Gold Filled',
    details: `Teal Beaded Stretch Bracelets. Made with a genuine white piece of sea glass from Laguna Beach, CA. Description: Set of 2 bracelets, Gold filled charms, Teal mountain jade beads, 7 inches in length (standard bracelet size), Sea glass size: x-small, Made with elastic bead cord, The size, shape, and shade of sea glass will vary slightly from bracelet to bracelet`,
    description: 'Our most popular sea glass bracelet, the beaded stretch bracelet, is the perfect accessory to any outfit. It consists of two bracelets; one with sea glass and a starfish charm, and the other with a beach inspired charm of your choice. For the first sea glass bracelet we start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. The sea glass is at least 25-50 years old and is hand selected to make sure it is free of flaws and fully aged. The glass is then carefully drilled with state of the art glass drilling equipment. After being drilled, the sea glass is delicately wrapped in thin wire to give it a touch of elegance. The wire wrapped sea glass is accompanied by a starfish charm on an elastic cord. Dyed marble beads are used, which are commonly called Mountain Jade Beads.  Lastly, another bracelet is made with smaller beads and a beach inspired charm. Together, these two bracelets make the perfect set! Every metal element on these bracelets is either gold filled or sterling silver.  Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/SBTG2-1.jpg', '/images/bracelets/SBTG2-2.jpg', '/images/bracelets/SBTG2-3.jpg']
  },
  product7: {
    SKU: 'SBNG3',
    price: 34.00,
    name: 'Sea Glass Bracelet: Navy Stretch Gold Filled',
    details: `Navy Beaded Stretch Bracelets. Made with a genuine white piece of sea glass from Laguna Beach, CA. Description: Set of 2 bracelets, Gold filled charms, Navy mountain jade beads, 7 inches in length (standard bracelet size), Sea glass size: x-small, Made with elastic bead cord, The size, shape, and shade of sea glass will vary slightly from bracelet to bracelet`,
    description: 'Our most popular sea glass bracelet, the beaded stretch bracelet, is the perfect accessory to any outfit. It consists of two bracelets; one with sea glass and a starfish charm, and the other with a beach inspired charm of your choice. For the first sea glass bracelet we start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. The sea glass is at least 25-50 years old and is hand selected to make sure it is free of flaws and fully aged. The glass is then carefully drilled with state of the art glass drilling equipment. After being drilled, the sea glass is delicately wrapped in thin wire to give it a touch of elegance. The wire wrapped sea glass is accompanied by a starfish charm on an elastic cord. Dyed marble beads are used, which are commonly called Mountain Jade Beads.  Lastly, another bracelet is made with smaller beads and a beach inspired charm. Together, these two bracelets make the perfect set! Every metal element on these bracelets is either gold filled or sterling silver.  Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/SBNG3-1.jpg', '/images/bracelets/SBNG3-2.jpg', '/images/bracelets/SBNG3-3.jpg']
  },
  product8: {
    SKU: 'SBAS4',
    price: 34.00,
    name: 'Sea Glass Bracelet: Aqua Stretch Sterling Silver',
    details: `Aqua Beaded Stretch Bracelets. Made with a genuine white piece of sea glass from Laguna Beach, CA. Description: Set of 2 bracelets, Sterling silver charms, Non-tarnish, Aqua mountain jade beads, 7 inches in length (standard bracelet size), Sea glass size: x-small, Made with elastic bead cord, The size, shape, and shade of sea glass will vary slightly from bracelet to bracelet`,
    description: 'Our most popular sea glass bracelet, the beaded stretch bracelet, is the perfect accessory to any outfit. It consists of two bracelets; one with sea glass and a starfish charm, and the other with a beach inspired charm of your choice. For the first sea glass bracelet we start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. The sea glass is at least 25-50 years old and is hand selected to make sure it is free of flaws and fully aged. The glass is then carefully drilled with state of the art glass drilling equipment. After being drilled, the sea glass is delicately wrapped in thin wire to give it a touch of elegance. The wire wrapped sea glass is accompanied by a starfish charm on an elastic cord. Dyed marble beads are used, which are commonly called Mountain Jade Beads.  Lastly, another bracelet is made with smaller beads and a beach inspired charm. Together, these two bracelets make the perfect set! Every metal element on these bracelets is either gold filled or sterling silver.  Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/SBAS4-1.jpg', '/images/bracelets/SBAS4-2.jpg', '/images/bracelets/SBAS4-3.jpg']
  },
  product9: {
    SKU: 'SBTS5',
    price: 32.00,
    name: 'Sea Glass Bracelet: Teal Stretch Sterling Silver',
    details: `Teal Beaded Stretch Bracelets. Made with a genuine white piece of sea glass from Laguna Beach, CA. Description: Set of 2 bracelets, Sterling silver charms, Teal mountain jade beads, 7 inches in length (standard bracelet size), Sea glass size: x-small, Made with elastic bead cord, The size, shape, and shade of sea glass will vary slightly from bracelet to bracelet`,
    description: 'Our most popular sea glass bracelet, the beaded stretch bracelet, is the perfect accessory to any outfit. It consists of two bracelets; one with sea glass and a starfish charm, and the other with a beach inspired charm of your choice. For the first sea glass bracelet we start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. The sea glass is at least 25-50 years old and is hand selected to make sure it is free of flaws and fully aged. The glass is then carefully drilled with state of the art glass drilling equipment. After being drilled, the sea glass is delicately wrapped in thin wire to give it a touch of elegance. The wire wrapped sea glass is accompanied by a starfish charm on an elastic cord. Dyed marble beads are used, which are commonly called Mountain Jade Beads.  Lastly, another bracelet is made with smaller beads and a beach inspired charm. Together, these two bracelets make the perfect set! Every metal element on these bracelets is either gold filled or sterling silver.  Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/SBTS5-1.jpg', '/images/bracelets/SBTS5-2.jpg', '/images/bracelets/SBTS5-3.jpg']
  },
  product10: {
    SKU: 'SBNS6',
    price: 32.00,
    name: 'Sea Glass Bracelet: Navy Stretch Sterling Silver',
    details: `Navy Beaded Stretch Bracelets. Made with a genuine white piece of sea glass from Laguna Beach, CA. Description: Set of 2 bracelets, Sterling silver charms, Navy mountain jade beads, 7 inches in length (standard bracelet size), Sea glass size: x-small, Made with elastic bead cord, The size, shape, and shade of sea glass will vary slightly from bracelet to bracelet`,
    description: 'Our most popular sea glass bracelet, the beaded stretch bracelet, is the perfect accessory to any outfit. It consists of two bracelets; one with sea glass and a starfish charm, and the other with a beach inspired charm of your choice. For the first sea glass bracelet we start out with a pristine piece of sea glass that was found in beautiful Laguna Beach, CA. The sea glass is at least 25-50 years old and is hand selected to make sure it is free of flaws and fully aged. The glass is then carefully drilled with state of the art glass drilling equipment. After being drilled, the sea glass is delicately wrapped in thin wire to give it a touch of elegance. The wire wrapped sea glass is accompanied by a starfish charm on an elastic cord. Dyed marble beads are used, which are commonly called Mountain Jade Beads.  Lastly, another bracelet is made with smaller beads and a beach inspired charm. Together, these two bracelets make the perfect set! Every metal element on these bracelets is either gold filled or sterling silver.  Because of its high quality, you can be rest assured that this beautiful piece of Sea Candy jewelry will stay looking good for years to come.',
    inventory: 20,
    rating: 4.49,
    images: ['/images/bracelets/SBNS6-1.jpg', '/images/bracelets/SBNS6-2.jpg', '/images/bracelets/SBNS6-3.jpg']
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
    name: 'Necklaces',
  },
  categoryB: {
    name: 'Rings',
  },
  categoryC: {
    name: 'Bracelets',
  },
  categoryD: {
    name: 'Gold Filled',
  },
  categoryE: {
    name: 'Sterling Silver',
  }
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
