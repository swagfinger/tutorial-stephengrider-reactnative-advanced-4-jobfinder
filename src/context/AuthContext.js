import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  authReducer, //reducer

  {}, //context methods

  { token: null, errorMessage: '' } //initial state
);
