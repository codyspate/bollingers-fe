import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

// Note: this API requires redux@>=3.1.0
const composeEnhancers =
    typeof window != 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
