import React from 'react'
import { Component } from 'react'
import { Alert } from 'react-native'
import { Login } from "./src/components/login/Login"
import { Products } from "./src/components/products/Products"

interface State {
  isLoggedIn: boolean,
  isProductSelected: boolean
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isLoggedIn: false,
      isProductSelected: false
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return this.productsScreen()
    } else {
      return this.loginScreen()
    }
  }

  loginScreen() {
    return <Login onLoginPressed = { () => this.setState({ isLoggedIn: true })  }/>
  }

  productsScreen() {
    return <Products onProductSelected = { (item) =>  Alert.alert(item.name) }/>
  }
}
