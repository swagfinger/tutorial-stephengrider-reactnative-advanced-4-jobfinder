import React, { useContext } from 'react';
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

//need access to state to see if there is token
import { Context } from './context/AuthContext';

import { FontAwesome } from '@expo/vector-icons';

const ReviewFlow = createNativeStackNavigator();
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

const MainFlow = createBottomTabNavigator();
function MainFlowScreen() {
  return (
    <MainFlow.Navigator screenOptions={{ headerShown: false }}>
      <MainFlow.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => <FontAwesome name="th-list" size={20} />
        }}
      />
      <MainFlow.Screen
        name="DeckScreen"
        component={DeckScreen}
        options={{
          tabBarLabel: 'Deck',
          tabBarIcon: () => <FontAwesome name="th-list" size={20} />
        }}
      />
      <MainFlow.Screen
        name="ReviewFlow"
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
  const { state } = useContext(Context);

  return (
    <NavigationContainer ref={navigationRef} style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false
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
          name="MainFlow"
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
