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
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProductList from './components/admin/ProductList'
import ProductForm from './components/admin/ProductForm'
import SingleProduct from './components/admin/SingleProduct'
import ProductCards from './components/ProductList'
import Cart from './components/Cart'
import Home from './components/Home'
import TheContainer from './components/text'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/navbar" component={Navbar} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path={`/single/:id`} component={ProductForm} />
          <Route exact path={`/single-product/:id`} component={SingleProduct} />
          <Route exact path={`/allproducts`} component={ProductCards} />
          <Route exact path={`/cart`} component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </main>
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
