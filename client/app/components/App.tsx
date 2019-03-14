/* APP STARTS HERE */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Pages } from '@routes';
import { configureStore } from '../store/configureStore';

const store = configureStore();

// dispatch to store
// store.dispatch(invoiceStatus(false));

// get and set tokens
// if (!localStorage.getItem('jwt')) {
//     localStorage.setItem('jwt', 'token');
// }

export class App extends Component {
  state = {};

  render = () => (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
}

export default hot(App);
