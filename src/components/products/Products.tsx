import React from 'react'
import { FlatList, Text, TouchableHighlight, View } from 'react-native'
import Product from '../../models/Product'
import { ProductRow } from './ProductRow'
import styles from './Products.style'

export interface Props {
  onProductSelected: ((product: Product) => void)
}

export class Products extends React.Component<Props, {}> {
  products: Product[] = [
    new Product('Product 1', 'Product 1 description', require('../../assets/img/audio.png')),
    new Product('Product 2', 'Product 2 description', require('../../assets/img/bed.png')),
    new Product('Product 3', 'Product 3 description', require('../../assets/img/bell.png')),
    new Product('Product 4', 'Product 4 description', require('../../assets/img/buy.png')),
    new Product('Product 5', 'Product 5 description', require('../../assets/img/calculator.png')),
    new Product('Product 6', 'Product 6 description', require('../../assets/img/calendar.png')),
    new Product('Product 7', 'Product 7 description', require('../../assets/img/camera.png')),
    new Product('Product 8', 'Product 8 description', require('../../assets/img/cell_phone.png'))
  ]
  
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style = { styles.root }>
        <Text style= { styles.title }>Products</Text>
        <View style = { styles.rowSeparator } />
        <FlatList
          data = { this.products }
          renderItem = { ({item}) =>
            <TouchableHighlight onPress = { () => this.props.onProductSelected(item) } underlayColor = 'whitesmoke' >
              <ProductRow productName = { item.name } imagePath = { item.imagePath } /> 
            </TouchableHighlight>
          }
          keyExtractor = { (item, _) => item.name  }
          ItemSeparatorComponent = { () => <View style = { styles.rowSeparator } /> }
        />
      </View>
    )
  }
}
