import React from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Product } from '../../models/Product';
import { ProductRow } from './ProductRow';
import styles from './Products.style';

const text = '  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eufugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia  deserunt mollit anim id est laborum.';

export class Products extends React.Component<NavigationScreenProps, {}> {
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

  render() {
    return (
      <View style = { styles.root }>
        <Text style= { styles.title }>Products</Text>
        <View style = { styles.rowSeparator } />
        <FlatList
          data = { this.products }
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
}
