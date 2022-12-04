import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import * as actions from '../actions';

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = (props) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '137479108168-kipjemhi7e840v9jq70of3bebl2jnghi.apps.googleusercontent.com',
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId:
      '137479108168-kipjemhi7e840v9jq70of3bebl2jnghi.apps.googleusercontent.com'
  });

  //redirect if no token
  useEffect(() => {
    if (request && !props.token) {
      console.log('before promtAsync(): ', props.token);
      promptAsync();
    }
  }, [request]);

  //handle response
  useEffect(() => {
    if (response) {
      props.handleResponse(response);
    }
  }, [response]);

  //redirect user after successful login
  useEffect(() => {
    if (!props.token) {
      // try google token login
      props.googleTokenLogin();
    } else {
      props.navigation.navigate('MainFlowScreen', { screen: 'MapScreen' });
    }
  }, [props.token]);
  return <View />;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);
