import React from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationScreenOptions, NavigationScreenProps } from "react-navigation";
import { ILoginService, LoginService } from '../../services/LoginService';
import { Error } from '../error/Error';
import styles from './Login.style';

interface ILoginState {
  email: string;
  password: string;
  isLoading: boolean;
  shouldShowError: boolean;
  errorTitle: string;
  errorDescription: string;
  isErrorRetriable: boolean;
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
      email: '',
      password: '',
      isLoading: false,
      shouldShowError: false,
      errorTitle: '',
      errorDescription: '',
      isErrorRetriable: false
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
        <Error
          retriable = { this.state.isErrorRetriable }
          title = { this.state.errorTitle }
          description = { this.state.errorDescription }
          onCloseButtonPress = { () => this.setState({ shouldShowError: false }) }
          onTryAgainButtonPress = { () => {
            this.setState({ shouldShowError: false });
            this.login();
          }}
          visible = { this.state.shouldShowError }>
        </Error>      
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
      this.setState({
        shouldShowError: true, 
        errorTitle: 'Email is empty!', 
        errorDescription: 'You have to provide email!',
        isErrorRetriable: false
      });
      return;
    }

    if (this.state.password === "") {
      this.setState({ 
        shouldShowError: true, 
        errorTitle: 'Password is empty!', 
        errorDescription: 'You have to provide password!',
        isErrorRetriable: false
      });
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
          this.setState({
            shouldShowError: true,
            errorTitle: 'Error',
            errorDescription: 'Please, check the data you provided',
            isErrorRetriable: true
          });
        }
      }).catch(_ => this.setState({
        isLoading: false,
        shouldShowError: true,
        errorTitle: 'Error',
        errorDescription: 'Please, try again later :(',
        isErrorRetriable: true
      }));
  }
}
