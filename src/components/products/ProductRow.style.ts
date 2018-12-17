import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  rowImage: {
    width: 30,
    height: 30
  },
  disclosureIndicator: {
    position: 'absolute',
    right: 0,
    width: 20,
    height: 20,
  },
  rowText: {
    textAlign: 'left',
    fontFamily: 'vincHand',
    fontSize: 30,
    marginLeft: 40
  },
});