import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const renderSlides = (data) => {
  return data.map((slide) => {
    return (
      <View
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
        key={slide.text}
      >
        <Text style={styles.textStyle}>{slide.text}</Text>
      </View>
    );
  });
};

const Slides = ({ data }) => {
  return (
    <ScrollView
      style={styles.scrollView}
      horizontal
      pagingEnabled
      persistentScrollbar
      indicatorStyle="black"
    >
      {renderSlides(data)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    borderColor: 'yellow',
    backgroundColor: 'pink',
    borderWidth: 1
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  }
});

export default Slides;
