import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {
    title: 'Main dishes',
    data: [
      'Pizza',
      'Burger',
      'Risotto',
      'Pizza',
      'Burger',
      'Risotto',
      'Pizza',
      'Burger',
      'Risotto',
    ],
  },
  {
    title: 'Sides',
    data: [
      'Burger',
      'Risotto',
      'Pizza',
      'Burger',
      'Risotto',
      'French Fries',
      'Onion Rings',
      'Fried Shrimps',
    ],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const props = {
  colors: ['#ff3bad', '#00fffd'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
};

const {width, height} = Dimensions.get('window');

export default class App extends React.Component {
  scrollY = new Animated.Value(0);

  getSectionOffsetTop(sectionIndex) {
    return DATA.slice(0, sectionIndex).reduce((acc, section) => {
      const contItems = section.data.length;
      const sectionHeight =
        contItems * ITEM_H + (contItems - 1) * SEPARATOR_H + HEADER_H;

      return acc + sectionHeight;
    }, 0);
  }

  getConfig(index) {
    return {
      inputRange: [0, this.getSectionOffsetTop(index)],
      outputRange: [-this.getSectionOffsetTop(index), 0],
      extrapolate: 'clamp',
    };
  }

  render() {
    return (
      <>
        <LinearGradient {...props} style={{flex: 1}}>
          <SafeAreaView style={styles.container}>
            <SectionList
              sections={DATA}
              stickySectionHeadersEnabled
              onScroll={Animated.event([
                {nativeEvent: {contentOffset: {y: this.scrollY}}},
              ])}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Item title={item} />}
              renderSectionHeader={({section}) => {
                const {title} = section;
                const index = DATA.indexOf(section);
                const y = this.scrollY.interpolate(this.getConfig(index));

                const animStyle = {
                  transform: [
                    {
                      translateY: y,
                    },
                  ],
                };
                return (
                  <View
                    style={styles.headerRoot}
                    onLayout={({nativeEvent: {...r}}) => {
                      // console.log(' --- index', index, r);
                    }}>
                    <Animated.View style={[styles.headerBg, animStyle]}>
                      <LinearGradient {...props} style={{flex: 1}} />
                    </Animated.View>
                    <Text style={styles.header}>{title}</Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={{height: SEPARATOR_H}} />
              )}
              contentContainerStyle={styles.scrollView}
            />
          </SafeAreaView>
        </LinearGradient>
      </>
    );
  }
}

const HEADER_H = 60;
const SEPARATOR_H = 16;
const ITEM_H = 50;
const M_H = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: M_H,
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
