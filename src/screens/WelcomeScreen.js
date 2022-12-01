import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App' },
  { text: 'Set your location', color: 'purple' },
  { text: 'then swipe away', color: 'turquoise' }
];

const WelcomeScreen = ({ navigation }) => {
  const redirect = () => {
    console.log('redirect');
    navigation.navigate('authscreen');
  };

  return (
    <View style={styles.container}>
      <Slides data={SLIDE_DATA} onComplete={redirect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});

export default WelcomeScreen;
