import {Dimensions, StyleSheet} from 'react-native';

export const HEADER_H = 80;

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  separatorRoot: {
    height: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ffaa',
    padding: 20,
  },
  header: {
    position: 'relative',
    fontSize: 32,
  },
  headerRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_H,
  },
  grRoot: {
    height,
    width: '100%',
  },
  bgRoot: {
    overflow: 'hidden',
    height: HEADER_H,
  },
  footerComponentStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
  },
});
