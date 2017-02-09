import {applyMiddleware} from 'redux';
import {websocketMiddleware} from './SockJSMiddleware';
import {restMiddleware} from './RestMiddleware';

export const middleware = applyMiddleware(
    websocketMiddleware,
    restMiddleware
);
