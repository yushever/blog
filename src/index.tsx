import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import reduxThunk from 'redux-thunk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
  <Provider store={store}>
    <App />
  </Provider>
);

