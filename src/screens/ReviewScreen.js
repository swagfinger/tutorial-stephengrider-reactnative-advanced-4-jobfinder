import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Linking,
  Platform
} from 'react-native';

import { Card, Button } from '@rneui/themed';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

const ReviewScreen = (props) => {
  const renderLikeJobs = () => {
    return props.likedJobs.liked.map((job) => {
      const {
        jobkey,
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle
      } = job;

      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card key={jobkey}>
          <Card.Title>{jobtitle}</Card.Title>
          <View
            style={{
              height: 200
            }}
          >
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <View>
              <Button
                title="Apply now"
                backgroundColor="#03A9F4"
                onPress={() => Linking.openURL(url)}
              />
            </View>
          </View>
        </Card>
      );
    });
  };

  return <ScrollView>{renderLikeJobs()}</ScrollView>;
};

function mapStateToProps(state) {
  return {
    likedJobs: state.likedJobs
  };
}
const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
});

export default connect(mapStateToProps)(ReviewScreen);
