import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 20
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 40,
    marginTop: 40
  },
  image: {
    width: 60,
    height: 60
  },
  title: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 50,
    marginLeft: 10
  },
  description: {
    textAlign: 'left',
    fontFamily: 'vincHand',
    fontSize: 20
  },
  button: {
    width: 150,
    height: 40,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 30,
    marginBottom: 80
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 30
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  }
});