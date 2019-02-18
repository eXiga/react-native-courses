import React from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { NavigationScreenProps } from 'react-navigation';
import { Product } from '../../models/Product';
import { CallService, ICallService } from '../../services/CallService';
import styles from './Map.style';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SHOW_INITIAL_POINT_DELAY = 5000;

interface IMapParams {
  product: Product;
}

interface IMapState {
  initialRegion: Region;
}

export class Map extends React.Component<NavigationScreenProps<IMapParams>, IMapState> {
  static navigationOptions = ({navigation}: NavigationScreenProps<IMapParams>) => {
    return {
      title: navigation.state.params ? `${navigation.state.params.product.name}'s location` : 'Location'
    };
  }

  private mapView: MapView | null;
  private callService: ICallService;

  constructor(props: NavigationScreenProps<IMapParams>) {
    super(props);
    this.mapView = null;

    this.callService = new CallService();
    const params: IMapParams | undefined = this.props.navigation.state.params;
    this.state = {
      initialRegion: {
        latitude: params!.product.location.latitude,
        longitude: params!.product.location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.mapView) {
        this.mapView.animateToRegion(this.state.initialRegion);
      }
    }, SHOW_INITIAL_POINT_DELAY);
  }

  render() {
    const params: IMapParams | undefined = this.props.navigation.state.params;

    return(
      <View style = { styles.root }>
        <MapView  ref = { (ref) => this.mapView = ref }
                  style = { styles.map } 
                  initialRegion = { this.state.initialRegion }>
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
        <TouchableOpacity
          style = { styles.button }
          onPress = { () =>  this.showInitialPoint() }
          activeOpacity = { .5 }>
            <Text style = { styles.buttonTitle }>Show location</Text> 
        </TouchableOpacity>
      </View>
    );
  }

  private showInitialPoint() {
    if (this.mapView) {
      this.mapView.animateToRegion(this.state.initialRegion);
    }
  }
}