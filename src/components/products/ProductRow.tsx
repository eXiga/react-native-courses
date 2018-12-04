import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './ProductRow.style'

export interface RowProps {
  productName: string,
  imagePath: any
}

export class ProductRow extends React.Component<RowProps, {}> {
  constructor(props: RowProps) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.row }>
        <Image 
          style = { styles.rowImage }
          source = { this.props.imagePath }
        />
        <Text style = { styles.rowText }>
          {`${this.props.productName }`}
        </Text>
        <Image
          style = { styles.disclosureIndicator }
          source = { require('../../assets/img/right_arrow.png') }
        />
      </View>
    )
  }
}