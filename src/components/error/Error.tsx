import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { IVibrationService, VibrationService } from '../../services/VibrationService';
import styles from './Error.style';


export interface IErrorProps {
  visible: boolean;
  retriable: boolean;
  title: string;
  description: string;
  onCloseButtonPress: () => void;
  onTryAgainButtonPress: () => void;
}

export class Error extends React.Component<IErrorProps, {}> {
  private vibrationService: IVibrationService;

  constructor(props: IErrorProps) {
    super(props);

    this.vibrationService = new VibrationService();
  }

  componentWillMount() {
    this.vibrationService.vibrateError();
  }

  render() {
    return(     
      <Modal
        onRequestClose = { () => this.props.onCloseButtonPress() }
        animationType = "slide" 
        transparent = { true }
        visible = { this.props.visible }>
        <View style = { styles.root }>
          <View style = { styles.errorContainer }>
            <Text style = { styles.errorTitle }>{ this.props.title }</Text>
            <Text style = { styles.errorDescription }>{ this.props.description }</Text>
              { this.actionButtons() }
          </View>
        </View>
      </Modal>
    );
  }

  closeButton() {
    return(
      <TouchableOpacity
        style= { styles.button }
        onPress = { () =>  this.props.onCloseButtonPress() }
        activeOpacity = { .5 }>
          <Text style = { styles.closeButtonTitle  }>Close</Text> 
      </TouchableOpacity>
    );
  }

  tryAgainButton() {
    return(
      <TouchableOpacity
        style= { styles.button }
        onPress = { () =>  this.props.onTryAgainButtonPress() }
        activeOpacity = { .5 }>
          <Text style = { styles.tryAgainButtonTitle  }>Try again</Text> 
      </TouchableOpacity>
    );
  }

  actionButtons() {
    if (this.props.retriable) {
      return(
        <View style = { styles.buttonsContainer }>
          { this.tryAgainButton() }
          { this.closeButton() }
        </View>
      );
    } else {
      return(
        <View style = { styles.buttonsContainer }>
          { this.closeButton() }
        </View>
      );
    }
  }
}