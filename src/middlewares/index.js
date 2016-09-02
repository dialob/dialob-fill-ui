import {applyMiddleware} from 'redux';
import {websocketMiddleware} from './SockJSMiddleware';
import thunk from 'redux-thunk';

export const middleware = applyMiddleware(
    thunk,
    websocketMiddleware
);
