import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from './middleware/api';
import rootReducer from './reducers/index';
import Root from './containers/Root';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware
  )
);

render(
  <Root store={store} />,
  document.getElementById('root')
);