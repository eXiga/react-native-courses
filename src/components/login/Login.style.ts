import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 40,
    height: 40
  },
  title: {
    marginTop: 60,
    marginBottom: 60,
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 50
  },
  inputs: {
    flexDirection: 'column',
    minHeight: 90,
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 30,
    padding: 0
  },
  button: {
    marginTop: 40,
    width: 100,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey'
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 30
  }
});