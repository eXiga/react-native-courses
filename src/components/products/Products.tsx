import React from 'react';
import { BackHandler, FlatList, Text, TouchableHighlight, View } from 'react-native';
import { NavigationEventSubscription, NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Product } from '../../models/Product';
import { ProductRow } from './ProductRow';
import styles from './Products.style';

const text = '  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eufugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia  deserunt mollit anim id est laborum.';

interface IProductsState {
  isRefreshing: boolean;
  products: Product[];
}

export class Products extends React.Component<NavigationScreenProps, IProductsState> {
  static navigationOptions: NavigationScreenOptions = {
    title: 'Products',
    headerLeft: null
  };

  products: Product[] = [
    new Product('Product 1', text, require('../../assets/img/audio.png')),
    new Product('Product 2', text, require('../../assets/img/bed.png')),
    new Product('Product 3', text, require('../../assets/img/bell.png')),
    new Product('Product 4', text, require('../../assets/img/buy.png')),
    new Product('Product 5', text, require('../../assets/img/calculator.png')),
    new Product('Product 6', text, require('../../assets/img/calendar.png')),
    new Product('Product 7', text, require('../../assets/img/camera.png')),
    new Product('Product 8', text, require('../../assets/img/cell_phone.png'))
  ];

  private didFocusSubscription?: NavigationEventSubscription;
  private willBlurSubscription?: NavigationEventSubscription;

  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      isRefreshing: false,
      products: []
    };

    this.didFocusSubscription = props.navigation.addListener('didFocus', _ => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    });
  }

  componentDidMount() {
    this.fetchProducts();

    this.willBlurSubscription = this.props.navigation.addListener('willBlur', _ => {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    });
  }

  componentWillUnmount() {
    if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }

    if (this.willBlurSubscription) {
      this.willBlurSubscription.remove();
    }
  }

  render() {
    return (
      <View style = { styles.root }>
        <Text style= { styles.title }>Products</Text>
        <View style = { styles.rowSeparator } />
        <FlatList
          refreshing = { this.state.isRefreshing }
          onRefresh = { () => this.onRefresh() }
          data = { this.state.products }
          renderItem = { ({item}) =>
            <TouchableHighlight onPress = { () => this.props.navigation.navigate('Product', { item: item }) } underlayColor = 'whitesmoke' >
              <ProductRow productName = { item.name } imagePath = { item.imagePath } /> 
            </TouchableHighlight>
          }
          keyExtractor = { (item, _) => item.name  }
          ItemSeparatorComponent = { () => <View style = { styles.rowSeparator } /> }
        />
      </View>
    );
  }

  private onRefresh() {
    this.setState({ isRefreshing: true });
    this.fetchProducts();
  }

  private fetchProducts() {
    this.setState({ isRefreshing: false, products: this.products });
  }

  private onBackButtonPressAndroid(): boolean {
    BackHandler.exitApp();
    return true;
  }
}
