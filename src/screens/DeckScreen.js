import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';
import { Card, Button } from '@rneui/themed';

import * as actions from '../actions';
import Swipe from '../components/Swipe';
import _ from 'lodash';

const DeckScreen = (props) => {
  const renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card>
        <Card.Title> {job.jobtitle}</Card.Title>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          ></MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>no more cards</Card.Title>
        <Button
          title="Back to map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() =>
            props.navigation.navigate('MainFlowScreen', { screen: 'MapScreen' })
          }
        />
      </Card>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Swipe
        data={props.jobs}
        renderNoMoreCards={renderNoMoreCards}
        renderCard={renderCard}
        onSwipeRight={(job) => props.likeJob(job)}
        keyProp="jobkey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return { jobs: state.jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
