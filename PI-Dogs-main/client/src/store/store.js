import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer/reducer.js';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

export let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
// export const store = createStore(rootReducer, applyMiddleware(thunk));


