import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '@rneui/themed';

import * as actions from '../actions';

const SettingsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Button
        title="reset liked jobs"
        large
        buttonStyle={{ backgroundColor: '#FF0000' }}
        icon={{ name: 'delete-forever' }}
        onPress={props.clearLikedJobs}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  }
});

export default connect(null, actions)(SettingsScreen);
