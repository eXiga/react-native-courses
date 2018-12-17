import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Product as ProductModel } from '../../models/Product';
import styles from './Product.style';

export interface Props {
  product: ProductModel;
  onBackButtonPressed: () => void;
}

interface Params {
  item: ProductModel;
}

export class Product extends React.Component<NavigationScreenProps<Params>, {}> { 
  static navigationOptions = ({navigation}: NavigationScreenProps<Params>) => {
    return {
      title: navigation.state.params ? navigation.state.params.item.name : 'Details'
    };
  }
  
  render() {
    const params: Params | undefined = this.props.navigation.state.params;

    return (
      <View style = { styles.root }>
        <View style = { styles.separator } />
        <View style = { styles.separator } />
        <View style = { styles.row }>
          <Image style = { styles.image } source = { params!.item.imagePath } />
          <Text style = { styles.title }>{`${params!.item.name }`}</Text>
        </View>
        <View style = { styles.column }>
          <Text style = { styles.description }>{`${params!.item.description}`}</Text>
          <TouchableOpacity
              style= { styles.button }
              onPress = { () => this.props.navigation.goBack() }
              activeOpacity = { .5 }>
                  <Text style = { styles.buttonTitle  }>All products</Text> 
          </TouchableOpacity>
        </View>
        <View style = { styles.separator } />
      </View>
    );
  }
}
