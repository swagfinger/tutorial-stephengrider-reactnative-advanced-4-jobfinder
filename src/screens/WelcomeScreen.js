import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SplashScreen from 'expo-splash-screen';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App' },
  { text: 'Set your location', color: 'purple' },
  { text: 'then swipe away', color: 'turquoise' }
];

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const WelcomeScreen = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    async function prepare() {
      let token;
      try {
        //prepare assets
        token = await AsyncStorage.getItem(`google_token`);
      } catch (e) {
        console.warn(e);
      } finally {
        if (token) {
          //redirect
          setAppIsReady(true);
          navigation.navigate('MainFlowScreen', { screen: 'MapScreen' });
        }
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const redirect = () => {
    console.log('redirect');
    navigation.navigate('AuthScreen');
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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
