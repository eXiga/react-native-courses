import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Product as ProductModel } from '../../models/Product';
import styles from './Product.style';

interface IProductParams {
  product: ProductModel;
}

export class Product extends React.Component<NavigationScreenProps<IProductParams>, {}> { 
  static navigationOptions = ({navigation}: NavigationScreenProps<IProductParams>) => {
    return {
      title: navigation.state.params ? navigation.state.params.product.name : 'Details'
    };
  }
  
  render() {
    const params: IProductParams | undefined = this.props.navigation.state.params;

    return (
      <View style = { styles.root }>
        <View style = { styles.separator } />
        <View style = { styles.separator } />
        <View style = { styles.row }>
          <Image style = { styles.image } source = { params!.product.imagePath } />
          <Text style = { styles.title }>{`${params!.product.name }`}</Text>
        </View>
        <View style = { styles.column }>
          <Text style = { styles.description }>{`${params!.product.description}`}</Text>
          <View style = { styles.buttonsContainer }>
            <TouchableOpacity
              style= { styles.button }
              onPress = { () => this.props.navigation.goBack() }
              activeOpacity = { .5 }>
                  <Text style = { styles.buttonTitle  }>All products</Text> 
            </TouchableOpacity>
            <TouchableOpacity
              style= { styles.button }
              onPress = { () => this.props.navigation.navigate('Map', { product: params!.product }) }
              activeOpacity = { .5 }>
                  <Text style = { styles.buttonTitle }>Show on map</Text> 
            </TouchableOpacity>
          </View>
        </View>
        <View style = { styles.separator } />
      </View>
    );
  }
}
