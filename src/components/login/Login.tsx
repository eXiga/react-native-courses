import LottieView from 'lottie-react-native';
import React from 'react';
import { 
  Animated,
  Easing,
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';  
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { AnalyticsService, IAnalyticsService } from '../../services/AnalyticsService';
import { ILoginService, LoginService } from '../../services/LoginService';
import { IReachabilityService, ReachabilityService } from '../../services/ReachabilityService';
import { IUserDefaultsService, UserDefaultsService } from '../../services/UserDefaultsService';
import { Error } from '../error/Error';
import { Spinner } from '../spinner/Spinner';
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

  private shakeAnimation: Animated.Value;

  private loginService: ILoginService;
  private userDefaultsService: IUserDefaultsService;
  private reachabilityService: IReachabilityService;
  private analyticsService: IAnalyticsService;

  constructor(props: NavigationScreenProps) {
    super(props);
    
    this.shakeAnimation = new Animated.Value(0);
    
    this.loginService = new LoginService();
    this.userDefaultsService = new UserDefaultsService();
    this.reachabilityService = new ReachabilityService();
    this.analyticsService = new AnalyticsService();

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

  async componentDidMount() {
    const credentials = await this.userDefaultsService.getCredentials();
    if (credentials.email == null || credentials.password == null) {
      SplashScreen.hide();
      return;
    }

    this.setState({
      email: credentials.email,
      password: credentials.password
    }, () => {
      this.analyticsService.trackMessage(
        'Login', 
        `Keychain data was retrieved by: ${this.state.email}`
      );
      SplashScreen.hide();
      this.login();
    });
  }

  render() {
    if (this.state.isLoading) {
      return(
        <View style = { styles.root }>
          <Spinner active = { true }/>
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
        <LottieView
          style = { styles.image }
          source = { require('../../assets/animations/gift_animation.json') }
          autoPlay
          loop
        />
        <Text style= { styles.title }>{`${DeviceInfo.getBrand()}`} Friday's shop</Text>
        { this.createInputForm() }
        <TouchableOpacity
            style= { styles.button }
            onPress = { () =>  this.login() }
            activeOpacity = { .5 }>
                <Text style = { styles.buttonTitle  }>Login</Text> 
        </TouchableOpacity>
      </View>
    );
  }

  private createInputForm() {
    const margins = this.shakeAnimation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
      outputRange: [0, -30, 30, -30, 30, -30, 0]
    });

    return(
      <Animated.View style = { [styles.inputs, { marginLeft: margins }] }>
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
        </Animated.View>
    );
  }

  private showInputError(callback: () => void) {
    this.shakeAnimation.setValue(0);
    Animated.timing(this.shakeAnimation, {
      toValue: 1,
      duration: 350,
      easing: Easing.linear
    }).start(() => callback());
  }

  private login() {
    this.analyticsService.trackMessage('Login', `Attempt to login with email: ${this.state.email}`);
    if (this.state.email === "") {
      this.showInputError(() => {
        this.setState({
          shouldShowError: true, 
          errorTitle: 'Email is empty!', 
          errorDescription: 'You have to provide email!',
          isErrorRetriable: false
        });
      });
      return;
    }

    if (this.state.password === "") {
      this.showInputError(() => {
        this.setState({ 
          shouldShowError: true, 
          errorTitle: 'Password is empty!', 
          errorDescription: 'You have to provide password!',
          isErrorRetriable: false
        });
      });
      return;
    }

    this.reachabilityService.isConnected(async () => {
      this.setState({ isLoading: true });
      try {
        const response = await this.loginService.login(this.state.email, this.state.password);
        this.setState({ isLoading: false });
        if (response.ok) {
          this.analyticsService.trackMessage('Login', `Login is successful for: ${this.state.email}`);
          const token = await response.json();
          await this.userDefaultsService.saveToken({ value: token });
          await this.userDefaultsService.saveCredentials({ email: this.state.email, password: this.state.password });
          this.props.navigation.navigate('Products'); 
        } else {
          this.analyticsService.trackError('Login', { 
            name: 'Login failed', 
            message: 'Server respons is not OK' 
          });
          this.setState({
            shouldShowError: true,
            errorTitle: 'Error',
            errorDescription: 'Please, check the data you provided',
            isErrorRetriable: true
          });
        }
      } catch (error) {
        this.analyticsService.trackError('Login', { 
          name: 'Login failed', 
          message: 'Cant perform network request' 
        });
        this.setState({
          isLoading: false,
          shouldShowError: true,
          errorTitle: 'Error',
          errorDescription: 'Please, try again later :(',
          isErrorRetriable: true
        });
      }
    }, () => {
      this.analyticsService.trackError('Login', { 
        name: 'Login failed', 
        message: 'No internet connection' 
      });
      this.setState({
        isLoading: false,
        shouldShowError: true,
        errorTitle: 'Error',
        errorDescription: 'No internet connection :(',
        isErrorRetriable: true
      });
    });
  }
}
