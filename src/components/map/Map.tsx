import React from 'react';
import { Alert, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { NavigationScreenProps } from 'react-navigation';
import { Product } from '../../models/Product';
import { CallService, ICallService } from '../../services/CallService';
import styles from './Map.style';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface IMapParams {
  product: Product;
}

export class Map extends React.Component<NavigationScreenProps<IMapParams>, {}> {
  static navigationOptions = ({navigation}: NavigationScreenProps<IMapParams>) => {
    return {
      title: navigation.state.params ? `${navigation.state.params.product.name}'s location` : 'Location'
    };
  }

  private callService: ICallService;

  constructor(props: NavigationScreenProps<IMapParams>) {
    super(props);

    this.callService = new CallService();
  }

  render() {
    const params: IMapParams | undefined = this.props.navigation.state.params;
    const region: Region = {
      latitude: params!.product.location.latitude,
      longitude: params!.product.location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    return(
      <MapView style = { styles.map } initialRegion = { region }>
        <Marker
          coordinate = { params!.product.location } 
          title = { params!.product.name }
          description = { params!.product.description }
          onCalloutPress = { () => {
            this.callService.call(params!.product.phone, () => {
              Alert.alert('Error', "Call can't be established", [{text: 'OK'}]);
            });
          }}
        />
      </MapView>
    );
  }

}