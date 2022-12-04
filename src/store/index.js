import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default store;

/*

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//---------------------------------------------------------------
//PERSIST DATA
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['likedJobs']
};

//'storage' is where to put the state
//whitelist comes from /reducers/index
//when testing - .purge() clears state
const persistedReducer = persistReducer(persistConfig, reducers);

//---------------------------------------------------------------
export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

*/
