import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';
import _ from 'lodash';
// import { REHYDRATE } from 'redux-persist';

const INITIAL_STATE = {
  liked: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    //case REHYDRATE:
    //console.log('REHYDRATE: ', action.payload);
    //return action.payload.likedJobs || {};

    case LIKE_JOB:
      return {
        ...state,
        liked: _.uniqBy([...state.liked, action.payload], 'jobkey')
      };
    case CLEAR_LIKED_JOBS:
      return { ...state, liked: [] };
    default:
      return state;
  }
}
