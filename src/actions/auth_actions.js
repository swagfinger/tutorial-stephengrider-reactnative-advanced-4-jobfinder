import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAIL } from '../actions/types';

//reduxthunk returns a function with dispatch as an argument
export const googleTokenLogin = () => async (dispatch) => {
  console.log('FUNCTION googleLogin');
  //TOKEN PERSISTENCE CHECK
  //AsyncStorage Methods
  //AsyncStorage.setItem('google_token', token);
  //AsyncStorage.getItem('google_token);
  //AsyncStorage.removeItem('google_token');

  let token = await AsyncStorage.getItem(`google_token`);

  if (token) {
    //dispatch an action say fb login is done
    console.log('token: ', token);
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token });
  }
};

export const handleResponse = (response) => {
  return async (dispatch) => {
    console.log('FUNCTION handleResponse');
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('authenticated: ', authentication);

      const { accessToken } = authentication;
      await AsyncStorage.setItem(`google_token`, accessToken);

      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
        payload: { token: accessToken }
      });
    }
    if (response?.type === 'cancel') {
      console.log('cancel');
      dispatch({ type: GOOGLE_LOGIN_FAIL });
    }
  };
};
