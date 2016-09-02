import {applyMiddleware} from 'redux';
import {websocketMiddleware} from './SockJSMiddleware';

export const middleware = applyMiddleware(
    websocketMiddleware
);
