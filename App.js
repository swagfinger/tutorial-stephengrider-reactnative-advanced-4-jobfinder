//context
import React from 'react';
import { StyleSheet } from 'react-native';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Navigation from './src/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Navigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});
