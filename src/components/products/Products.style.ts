import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 60,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'vincHand',
    fontSize: 50
  },
  row: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowText: {
    textAlign: 'left',
    fontFamily: 'vincHand',
    fontSize: 30
  },
  rowSeparator: {
    height: 1,
    backgroundColor: 'gray',
  }
})