import React from 'react';
import { View, StyleSheet } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App', color: 'green' },
  { text: 'Set your location', color: 'purple' },
  { text: 'then swipe away', color: 'turquoise' }
];

const WelcomeScreen = () => {
  return <Slides data={SLIDE_DATA} />;
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
