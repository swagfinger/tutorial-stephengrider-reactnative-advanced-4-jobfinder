import React, { useReducer } from 'react';

//receives these 3 props
export default (reducer, actions, defaultValue) => {
  //CONTEXT
  const Context = React.createContext();

  //PROVIDER - has acess to state , actions
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch); //call each key with "key"(dispatch)
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
