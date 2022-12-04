import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import * as Location from 'expo-location';
import * as actions from '../actions';
import MapView from 'react-native-maps';

const MapScreen = (props) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  });

  useEffect(() => {
    (async () => {
      try {
        // let { status } = await Location.requestForegroundPermissionsAsync();
        // if (status !== 'granted') {
        //   setErrorMsg('Permission to access location was denied');
        //   return;
        // }
      } catch (err) {
        // console.log({ err });
      }
    })();

    setMapLoaded(true);
  }, []);

  //updates long/lat delta when map position changes
  onRegionChange = (region) => {
    console.log({ region });
    setRegion(region);
  };

  onButtonPress = () => {
    //function is from action creator src/actions/job_action
    props.fetchJobs(region, () => {
      console.log('DATA LOADED!');
      props.navigation.navigate('MainFlowScreen', { screen: 'DeckScreen' });
    });
  };

  return !mapLoaded ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        style={styles.map}
        onRegionChange={onRegionChange}
      />
      <View style={styles.buttonContainer}>
        <Button
          large
          title="search this area"
          backgroundColor="#009688"
          icon={{ name: 'search' }}
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10
  },
  map: {
    height: 300
  }
});

export default connect(null, actions)(MapScreen);
