import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  circlesContainer: {
    width: 100,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    height: 20,
    width: 20,
    margin: 10,
    backgroundColor: '#76cdd8',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#76cdd8',
  },
});