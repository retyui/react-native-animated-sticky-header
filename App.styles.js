import {Dimensions, StyleSheet} from 'react-native';

export const HEADER_H = 60;
export const SEPARATOR_H = 16;
export const ITEM_H = 50;

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  separatorRoot: {
    height: SEPARATOR_H,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ffaa',
    height: ITEM_H,
  },
  header: {
    position: 'relative',
    fontSize: 32,
  },
  headerRoot: {
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_H,
  },
  headerBg: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
    // opacity: 0.5,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  title: {
    fontSize: 24,
  },
});
