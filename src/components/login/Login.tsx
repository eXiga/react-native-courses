import React from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NavigationScreenOptions, NavigationScreenProps } from "react-navigation";
import styles from './Login.style'

interface State {
  email: string,
  password: string
}

export class Login extends React.Component<NavigationScreenProps, State> {
  static navigationOptions: NavigationScreenOptions = {
    title: 'Login',
    headerBackTitle: null
  }

  constructor(props: NavigationScreenProps) {
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
            onPress = { () => this.props.navigation.navigate('Products') }
            activeOpacity = { .5 }>
                <Text style = { styles.buttonTitle  }>Login</Text> 
        </TouchableOpacity>
      </View>
    )
  }
}

