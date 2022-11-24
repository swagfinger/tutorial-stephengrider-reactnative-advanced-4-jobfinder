import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from '@rneui/themed';

const SCREEN_WIDTH = Dimensions.get('window').width;

const renderSlides = (data, onComplete) => {
  return data.map((slide, index) => {
    return (
      <View
        style={[
          styles.slideStyle,
          slide.color && { backgroundColor: slide.color }
        ]}
        key={slide.text}
      >
        <Text style={styles.textStyle}>{slide.text}</Text>

        {/* if last slide */}
        {index === data.length - 1 ? (
          <Button
            title="ok"
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              console.log('redirect pressed');
              onComplete();
            }}
          />
        ) : null}
      </View>
    );
  });
};

const Slides = ({ data, onComplete }) => {
  return (
    <ScrollView
      style={styles.scrollView}
      horizontal={true}
      pagingEnabled
      persistentScrollbar={true}
      showsHorizontalScrollIndicator={true}
      indicatorStyle="black"
    >
      <View style={styles.container}>{renderSlides(data, onComplete)}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
    boxSizing: 'border-box'
  },

  //slide wrapper
  scrollView: {
    borderColor: 'rgba(25, 35, 155, 0.5)',
    backgroundColor: 'pink',
    borderWidth: 3,
    flex: 1
  },

  //each slide
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    boxSizing: 'border-box'
  },

  textStyle: {
    fontSize: 30,
    color: 'white'
  },

  buttonStyle: {
    backgroundColor: 'red',
    marginTop: 50
  }
});

export default Slides;
