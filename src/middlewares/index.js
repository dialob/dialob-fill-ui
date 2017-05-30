import {applyMiddleware} from 'redux';
import {websocketMiddleware} from './SockJSMiddleware';
import {restMiddleware} from './RestMiddleware';
import {submitCallbackMiddleware} from './submitCallbackMiddleware';

export const middleware = applyMiddleware(
    websocketMiddleware,
    restMiddleware,
    submitCallbackMiddleware
);
