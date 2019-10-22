import React from 'react';
import {Animated, SafeAreaView, SectionList, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import DATA from './App.data';
import styles from './App.styles';

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

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

class App extends React.Component {
  scrollY = new Animated.Value(0);

  renderSectionHeader = ({section}) => {
    const {title} = section;

    return (
      <View style={styles.headerRoot}>
        <Text style={styles.header}>{title}</Text>
      </View>
    );
  };

  onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
    {useNativeDriver: true},
  );

  renderItem = ({item}) => <Item title={item} />;

  ItemSeparatorComponent = () => <View style={styles.separatorRoot} />;

  ListHeaderComponent = () => {
    const animStyle = {
      transform: [{translateY: this.scrollY}],
    };

    return (
      <Animated.View style={[styles.bgRoot, animStyle]}>
        <LinearGradient {...props} style={styles.grRoot} />
      </Animated.View>
    );
  };

  render() {
    return (
      <>
        <LinearGradient {...props} style={styles.root}>
          <SafeAreaView style={styles.root}>
            <AnimatedSectionList
              stickySectionHeadersEnabled
              sections={DATA}
              onScroll={this.onScroll}
              keyExtractor={keyExtractor}
              renderItem={this.renderItem}
              contentContainerStyle={styles.scrollView}
              renderSectionHeader={this.renderSectionHeader}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
              ListFooterComponent={this.ListHeaderComponent}
              ListFooterComponentStyle={styles.footerComponentStyle}
            />
          </SafeAreaView>
        </LinearGradient>
      </>
    );
  }
}

export default App;
