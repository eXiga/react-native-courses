import React from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from './Login.style'

export interface Props {
  onLoginPressed?: () => void
}

interface State {
  email: string,
  password: string
}

export class Login extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      email: "",
      password: "",
    }
  }

  render() {
    return (
      <View style = { styles.root }>
        <Image 
          style = { styles.image }
          source = { require('../../assets/img/logo.png') }
        />
        <Text style= { styles.title }>Friday's shop</Text>
        <View style = { styles.inputs }>
          <TextInput
            style = { styles.input }
            onChangeText = { (text) => this.setState({ email: text }) }
            placeholder = 'email'
            value = { this.state.email }
          />
          <TextInput
            style = { styles.input }
            onChangeText = { (text) => this.setState({ password: text }) }
            placeholder = 'password'
            value = { this.state.password }
          />
        </View>
        <TouchableOpacity
            style= { styles.button }
            onPress = { this.props.onLoginPressed }
            activeOpacity = { .5 }>
                <Text style = { styles.buttonTitle  }>Login</Text> 
        </TouchableOpacity>
      </View>
    )
  }
}

