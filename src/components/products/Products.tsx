import React from 'react';
import { BackHandler, FlatList, Text, TouchableHighlight, View } from 'react-native';
import { NavigationEventSubscription, NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Product } from '../../models/Product';
import { IProductsService, ProductsService } from '../../services/ProductsService';
import { Error } from '../error/Error';
import { Spinner } from '../spinner/Spinner';
import { ProductRow } from './ProductRow';
import styles from './Products.style';

const text = '  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eufugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia  deserunt mollit anim id est laborum.';

interface IProductsState {
  isLoading: boolean;
  isRefreshing: boolean;
  products: Product[];
  productsPage: number;
  productsPageOffset: number;
  shouldShowError: boolean;
  errorTitle: string;
  errorDescription: string;
  isErrorRetriable: boolean; 
}

export class Products extends React.Component<NavigationScreenProps, IProductsState> {
  static navigationOptions: NavigationScreenOptions = {
    title: 'Products',
    headerLeft: null
  };

  private assets = [
    require('../../assets/img/audio.png'),
    require('../../assets/img/bed.png'),
    require('../../assets/img/bell.png'),
    require('../../assets/img/buy.png'),
    require('../../assets/img/calculator.png'),
    require('../../assets/img/calendar.png'),
    require('../../assets/img/camera.png'),
    require('../../assets/img/cell_phone.png')
  ];

  private didFocusSubscription?: NavigationEventSubscription;
  private willBlurSubscription?: NavigationEventSubscription;

  private productsService: IProductsService;

  constructor(props: NavigationScreenProps) {
    super(props);

    this.productsService = new ProductsService();
    this.state = {
      isLoading: false,
      isRefreshing: false,
      products: [],
      productsPage: 10,
      productsPageOffset: 1,
      shouldShowError: false,
      errorTitle: '',
      errorDescription: '',
      isErrorRetriable: false 
    };

    this.didFocusSubscription = props.navigation.addListener('didFocus', _ => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    });
  }

  componentDidMount() {
    this.setState({ isRefreshing: true }, () => this.fetchProducts());

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
        <Error
          retriable = { this.state.isErrorRetriable }
          title = { this.state.errorTitle }
          description = { this.state.errorDescription }
          onCloseButtonPress = { () => this.setState({ shouldShowError: false }) }
          onTryAgainButtonPress = { () => {
            this.setState({ isRefreshing: true, shouldShowError: false });
            this.fetchProducts();
          }}
          visible = { this.state.shouldShowError }>
        </Error>   
        <Text style= { styles.title }>Products</Text>
        <View style = { styles.rowSeparator } />
        <FlatList
          ListFooterComponent = { () => this.footer() }
          refreshing = { this.state.isRefreshing }
          onRefresh = { () => this.onRefresh() }
          onEndReached = { () => this.onEndReached() }
          onEndReachedThreshold = { 1 }
          data = { this.state.products }
          renderItem = { ({ item }) =>
            <TouchableHighlight 
              onPress = { () => this.props.navigation.navigate('Product', { product: item }) } 
              underlayColor = 'whitesmoke' >
              <ProductRow productName = { item.name } imagePath = { item.imagePath } /> 
            </TouchableHighlight>
          }
          keyExtractor = { (item, _) => item.id.toString() }
          ItemSeparatorComponent = { () => <View style = { styles.rowSeparator } /> }
        />
      </View>
    );
  }

  private footer() {
    if (!this.state.isLoading) {
      return null;
    }

    return(
      <View style = { styles.footer }>
        <Spinner active = { true } />
      </View>
    );
  }

  private onRefresh() {
    this.setState({ isRefreshing: true, productsPageOffset: 1 }, () => this.fetchProducts());
  }

  private onEndReached() {
    this.setState({ 
      isLoading: true, productsPageOffset: this.state.productsPageOffset + 1 
    }, () => this.fetchProducts());
  }

  private fetchProducts() {
    this.productsService.getProducts(this.state.productsPage, this.state.productsPageOffset)
      .then(response => response.json())
      .then(json => {
        const items: Array<{id: number, name: string}> = json.items;
        const products: Product[] = items.map(item => {
          const randomAsset = this.assets[Math.floor(Math.random() * this.assets.length)];
          return new Product(item.id, item.name, text, randomAsset, 
                             { latitude: 50.0646501, longitude: 19.9449799  },
                             "48530670758");
        });

        this.setState({
          products: this.state.isRefreshing ? 
                    products :
                    this.state.products.concat(products),
          isRefreshing: false,
          isLoading: false
        });
      })
      .catch(_ => this.setState({
        isLoading: false,
        isRefreshing: false,
        shouldShowError: true,
        errorTitle: 'Error',
        errorDescription: 'Please, try again later :(',
        isErrorRetriable: true
      }));
  }

  private onBackButtonPressAndroid(): boolean {
    BackHandler.exitApp();
    return true;
  }
}
