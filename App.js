import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import { PersistGate } from 'redux-persist/integration/react';

// import { store, persistor } from './src/store';
import store from './src/store';
import Navigation from './src/Navigation';

export default function App() {
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
