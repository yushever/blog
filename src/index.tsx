import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import reducer from './reducer';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function loggerMiddleware() {
  return function (next: any) {
    return function (action: {}) {
      const result = next(action);
      return result;
    };
  };
}

const store = createStore(reducer, compose(applyMiddleware(loggerMiddleware, reduxThunk)));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
