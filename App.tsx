import React from 'react'
import { Component } from 'react'
import { Login } from './src/components/login/Login'
import { Product } from './src/components/product/Product'
import { Products } from './src/components/products/Products'
import { Product as ProductModel } from './src/models/Product'

interface State {
  isLoggedIn: boolean,
  isProductSelected: boolean
  selectedProduct?: ProductModel
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isLoggedIn: false,
      isProductSelected: false,
      selectedProduct: undefined
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return this.loginScreen()
    } else {
      if (this.state.isProductSelected) {
        return this.productScreen(this.state.selectedProduct!)
      } else {
        return this.productsScreen()
      }
    }
  }

  loginScreen() {
    return <Login onLoginPressed = { () => this.setState({ isLoggedIn: true })  }/>
  }

  productsScreen() {
    return <Products onProductSelected = { (item) =>  this.setState({ isProductSelected: true, selectedProduct: item }) }/>
  }

  productScreen(item: ProductModel) {
    return <Product product = {item} onBackButtonPressed = { () => this.setState({ isProductSelected: false, selectedProduct: undefined }) } />
  }
}
