import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Product as ProductModel } from '../../models/Product'
import styles from './Product.style'

export interface Props {
  product: ProductModel
  onBackButtonPressed: () => void
}

export class Product extends React.Component<Props, {}> {  
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style = { styles.root }>
        <View style = { styles.separator } />
        <View style = { styles.separator } />
        <View style = { styles.row }>
          <Image style = { styles.image } source = { this.props.product.imagePath } />
          <Text style = { styles.title }>{`${this.props.product.name }`}</Text>
        </View>
        <View style = { styles.column }>
          <Text style = { styles.description }>{`${this.props.product.description}`}</Text>
          <TouchableOpacity
              style= { styles.button }
              onPress = { this.props.onBackButtonPressed }
              activeOpacity = { .5 }>
                  <Text style = { styles.buttonTitle  }>All products</Text> 
          </TouchableOpacity>
        </View>
        <View style = { styles.separator } />
      </View>
    )
  }
}
