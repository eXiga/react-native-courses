import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  errorContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: 300,
    height: 200
  },
  errorTitle: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 40
  },
  errorDescription: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 25
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'baseline'
  },
  button: {
    marginTop: 10,
    width: 100,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey'
  },
  tryAgainButtonTitle: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 30
  },
  closeButtonTitle: {
    color: '#ff0000',
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 30,
  }
});