import React, { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './src/store';

import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './src/services/push_notifications';

import store from './src/store';
import Navigation from './src/Navigation';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log('message: ', notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* ---- */}
      {/* safe area */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Navigation />
        </SafeAreaView>
      </SafeAreaProvider>
      {/* ---- */}
      {/* </PersistGate> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});
