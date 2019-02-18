import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    position: 'absolute', 
    bottom: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#F5FCFF'
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 30
  }
});