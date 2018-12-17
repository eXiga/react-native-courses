import React from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationScreenOptions, NavigationScreenProps } from "react-navigation";
import { ILoginService, LoginService } from '../../services/LoginService';
import styles from './Login.style';

interface ILoginState {
  email: string;
  password: string;
  isLoading: boolean;
}

export class Login extends React.Component<NavigationScreenProps, ILoginState> {
  static navigationOptions: NavigationScreenOptions = {
    title: 'Login',
    headerBackTitle: null
  };

  private loginService: ILoginService;

  constructor(props: NavigationScreenProps) {
    super(props);

    this.loginService = new LoginService();
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  render() {
    if (this.state.isLoading) {
      return(
        <View style = { styles.root }>
          <ActivityIndicator/>
        </View>
      );
    }

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
            secureTextEntry = { true }
            onChangeText = { (text) => this.setState({ password: text }) }
            placeholder = 'password'
            value = { this.state.password }
          />
        </View>
        <TouchableOpacity
            style= { styles.button }
            onPress = { () =>  this.login() }
            activeOpacity = { .5 }>
                <Text style = { styles.buttonTitle  }>Login</Text> 
        </TouchableOpacity>
      </View>
    );
  }

  private login() {
    if (this.state.email === "") {
      Alert.alert('Email is empty', 'You have to provide email!', [{text: 'OK'}]);
      return;
    }

    if (this.state.password === "") {
      Alert.alert('Password is empty', 'You have to provide password!', [{text: 'OK'}]);
      return;
    }

    this.setState({ isLoading: true });
    this.loginService
      .login(this.state.email, this.state.password)
      .then( response => {
        this.setState({ isLoading: false });
        if (response.ok) {
          this.props.navigation.navigate('Products');
        } else {
          Alert.alert('Error', 'Please, check the data you provided', [{text: 'OK'}]);
        }
      }).catch(_ => Alert.alert('Error', 'Please, try again :(', [{text: 'OK'}]));
  }
}
