'use strict'
/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import store from './store'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Review from './components/Review'
import NotFound from './components/NotFound'
import ProductList from './components/admin/ProductList'
import ProductForm from './components/admin/ProductForm'
import addReview from './components/addReview'
import SingleProduct from './components/admin/SingleProduct'
import EditProduct from './components/admin/EditProduct'
import ProductCards from './components/ProductList'
import Cart from './components/Cart'
import Home from './components/Home'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <main>
      <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/review' component={Review} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/shop' component={ProductCards} />
          <Route exact path='/products' component={ProductList} />
          <Route exact path='/addReview' component={addReview} />
          <Route exact path='/addProduct' component={ProductForm} />
          <Route exact path={`/edit/:id`} component={EditProduct} />
          <Route exact path={`/shop/:id`} component={SingleProduct} />
          <Route exact path={`/cart`} component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
)

render(
  <Provider store={store}>
    <Router>
      <ExampleApp />
    </Router>
  </Provider>,
  document.getElementById('main')
)
