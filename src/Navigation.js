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

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ReviewFlow = createNativeStackNavigator();
function ReviewFlowScreen() {
  return (
    <ReviewFlow.Navigator screenOptions={{ headerShown: true }}>
      <ReviewFlow.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={({ navigation, route }) => {
          return {
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('SettingsScreen')}
                title="Settings"
              />
            )
          };
        }}
      />
      <ReviewFlow.Screen name="SettingsScreen" component={SettingsScreen} />
    </ReviewFlow.Navigator>
  );
}

const MainFlow = createBottomTabNavigator();
function MainFlowScreen() {
  return (
    <MainFlow.Navigator screenOptions={{ headerShown: false }}>
      <MainFlow.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="map-marker" size={20} color={tintColor} />
          )
        }}
      />
      <MainFlow.Screen
        name="DeckScreen"
        component={DeckScreen}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ tintColor }) => (
            <MaterialIcons name="description" size={20} />
          )
        }}
      />
      <MainFlow.Screen
        name="ReviewFlowScreen"
        component={ReviewFlowScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: () => <MaterialIcons name="favorite" size={20} />
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
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            tabBarLabel: 'Welcome',
            tabBarIcon: () => <FontAwesome name="th-list" size={20} />
          }}
        />
        <Tab.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            tabBarLabel: 'Auth',
            tabBarIcon: () => <FontAwesome name="th-list" size={20} />
          }}
        />
        <Tab.Screen
          name="MainFlowScreen"
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
