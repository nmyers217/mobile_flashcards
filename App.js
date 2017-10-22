import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import { saveDecks } from './utils/api';
import HomeContainer from './containers/Home';

const store = createStore(reducer);
store.subscribe(() => saveDecks(store.getState()));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    );
  }
};
