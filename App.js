import React from 'react';
import {Animated, SafeAreaView, SectionList, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import DATA from './App.data';
import styles, {HEADER_H, ITEM_H, SEPARATOR_H} from './App.styles';

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

const keyExtractor = (item, index) => item + index;

class App extends React.Component {
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

  renderSectionHeader = ({section}) => {
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
      <View style={styles.headerRoot}>
        <Animated.View style={[styles.headerBg, animStyle]}>
          <LinearGradient {...props} style={{flex: 1}} />
        </Animated.View>
        <Text style={styles.header}>{title}</Text>
      </View>
    );
  };

  onScroll = Animated.event([
    {nativeEvent: {contentOffset: {y: this.scrollY}}},
  ]);

  renderItem = ({item}) => <Item title={item} />;

  ItemSeparatorComponent = () => <View style={styles.separatorRoot} />;

  render() {
    return (
      <>
        <LinearGradient {...props} style={styles.root}>
          <SafeAreaView style={styles.root}>
            <SectionList
              stickySectionHeadersEnabled
              sections={DATA}
              onScroll={this.onScroll}
              keyExtractor={keyExtractor}
              renderItem={this.renderItem}
              contentContainerStyle={styles.scrollView}
              renderSectionHeader={this.renderSectionHeader}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />
          </SafeAreaView>
        </LinearGradient>
      </>
    );
  }
}

export default App;
