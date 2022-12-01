import React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
//createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import { FontAwesome } from '@expo/vector-icons';

const reviewflow = createNativeStackNavigator();
function ReviewFlowScreen() {
  return (
    <ReviewFlow.Navigator screenOptions={{ headerShown: true }}>
      <ReviewFlow.Screen
        name="Review"
        component={ReviewScreen}
        options={({ navigation, route }) => {
          return {
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Settings')}
                title="Settings"
              />
            )
          };
        }}
      />
      <ReviewFlow.Screen name="Settings" component={SettingsScreen} />
    </ReviewFlow.Navigator>
  );
}

const mainflow = createBottomTabNavigator();
function MainFlowScreen() {
  return (
    <MainFlow.Navigator screenOptions={{ headerShown: false }}>
      <MainFlow.Screen
        name="mapscreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => <FontAwesome name="th-list" size={20} />
        }}
      />
      <MainFlow.Screen
        name="deckscreen"
        component={DeckScreen}
        options={{
          tabBarLabel: 'Deck',
          tabBarIcon: () => <FontAwesome name="th-list" size={20} />
        }}
      />
      <MainFlow.Screen
        name="reviewflow"
        component={ReviewFlowScreen}
        options={{
          tabBarLabel: 'Review',
          tabBarIcon: () => <FontAwesome name="th-list" size={20} />
        }}
      />
    </MainFlow.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function () {
  return (
    <NavigationContainer ref={navigationRef} style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          lazy: true,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Tab.Screen
          name="welcomescreen"
          component={WelcomeScreen}
          options={{
            tabBarLabel: 'Welcome',
            tabBarIcon: () => <FontAwesome name="th-list" size={20} />
          }}
        />
        <Tab.Screen
          name="authscreen"
          component={AuthScreen}
          options={{
            tabBarLabel: 'Auth',
            tabBarIcon: () => <FontAwesome name="th-list" size={20} />
          }}
        />
        <Tab.Screen
          name="mainflow"
          component={MainFlowScreen}
          options={{
            tabBarLabel: 'Main',
            tabBarIcon: () => <FontAwesome name="th-list" size={20} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flwex: 1
  }
});
