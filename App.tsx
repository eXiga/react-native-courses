import React from 'react';
import { Component } from 'react';
import { Login } from "./src/components/login/Login"
import { Products } from "./src/components/products/Products"

interface State {
  isLoggedIn: boolean
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return this.productsScreen()
    } else {
      return this.loginScreen()
    }
  }

  loginScreen() {
    return <Login onLoginPressed = { () => this.setState({ isLoggedIn: true })  }/>
  }

  productsScreen() {
    return <Products />
  }
}
