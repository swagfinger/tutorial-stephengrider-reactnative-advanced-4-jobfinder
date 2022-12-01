import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import * as actions from '../actions';

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = (props) => {
  // google login
  useEffect(() => {
    props.googleTokenLogin();
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '137479108168-kipjemhi7e840v9jq70of3bebl2jnghi.apps.googleusercontent.com',
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId:
      '137479108168-kipjemhi7e840v9jq70of3bebl2jnghi.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (request) {
      console.log('request');
      promptAsync();
    }
  }, [request]);

  useEffect(() => {
    props.handleResponse(response);
  }, [response]);

  return <View />;
};

export default connect(null, actions)(AuthScreen);
