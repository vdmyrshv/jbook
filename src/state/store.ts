import { createStore, applyMiddleware } from 'redux';
// thunk is a middleware for syncing with outside apis
import thunk from 'redux-thunk';

import reducers from './reducers';

// empty object is for initial state
export const store = createStore(reducers, {}, applyMiddleware(thunk));

