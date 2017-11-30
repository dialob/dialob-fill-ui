/**
 *  Copyright 2016 ReSys OÜ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import SockJS from 'sockjs-client';
import {onOpen,onMessage,onError,onClose,onReconnected} from '../actions/WebsocketActions';
import {setRequestToken} from '../actions/Actions';
import * as WebsocketAction from '../actions/WebsocketActionConstants';
import * as Actions from '../actions/ActionConstants';
import {batchActionsTo} from '../utils/batchActionsTo';

const SOCKET_ACTIONS = [
  Actions.ANSWER_QUESTION,
  Actions.COMPLETE_QUESTIONNAIRE,
  Actions.NEXT_PAGE,
  Actions.PREVIOUS_PAGE,
  Actions.WAKE_UP,
  Actions.CONNECT,
  Actions.ADD_ROW,
  Actions.DELETE_ROW,
  WebsocketAction.MESSAGE,
  //WebsocketAction.RECONNECT,
  WebsocketAction.OPEN,
  WebsocketAction.CLOSE
];

function connectToWebsocket(configuration,dispatch) {
  if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
    console.log(`connect to websocket ${configuration.url}`);  //eslint-disable-line no-console
  }
  dispatch({type: WebsocketAction.CONNECTING});
  var options;
  if (configuration.transports) {
    options = {
      transports: configuration.transports
    };
  }
  var url = configuration.url;
  if (typeof url === 'function') {
    url = url();
  }
  var sock = new SockJS(url,null,options);
  sock.onmessage = function (message) {
    if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
      console.log('on websocket message', message.data);  //eslint-disable-line no-console
    }
    dispatch(onMessage(message));
  };
  sock.onopen = function () {
    if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
      console.log('on websocket open');  //eslint-disable-line no-console
    }
    dispatch(onOpen());
  };
  sock.onerror = function (error) {
    if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
      console.log(`on websocket error ${error}`);  //eslint-disable-line no-console
    }
    dispatch(onError(error));
  };
  sock.onclose = function (close) {
    if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
      console.log(`on websocket close ${JSON.stringify(close)}`);  //eslint-disable-line no-console
    }
    dispatch(onClose(close));
  };
  return sock;
}

const prevRev = (state) => state.connection.get('token');

const websocketMiddleware = store => {
    var state = store.getState();
    var configuration = state.config.toJS();
    if (configuration.connectionMode === 'rest') {
      return next => action => next(action);
    }
    var socket = connectToWebsocket(configuration, action => store.dispatch(action));
    let postponedActions = [];
    return next => action => {

      if (SOCKET_ACTIONS.indexOf(action.type) < 0) {
        // Ignore non-socket actions
        return next(action);
      }
      if (!action.serverEvent) { // do not return server events back
        if (!socket && action.type === Actions.CONNECT) {
          // socket = connectToWebsocket(configuration, action => store.dispatch(action));
          return next(action);
        }
        if (!socket) {
          postponedActions.push(action);
          socket = connectToWebsocket(configuration, action => store.dispatch(action));
        /*
        } else if (action.type === WebsocketAction.RECONNECT && socket.readyState === SockJS.CLOSED) {
          // TODO: Check reconnect action?
          socket = connectToWebsocket(configuration, action => store.dispatch(action)); */
        } else if (socket.readyState === SockJS.OPEN) {
          let actions = {
            prevRev: prevRev(store.getState()),
            actions: [action]
          };
          var message = JSON.stringify(actions);
          socket.send(message);
        } else {
          postponedActions.push(action);
        }
      } else if (action.type === WebsocketAction.CLOSE) {
      } else if (action.type === WebsocketAction.OPEN) {
        if (store.getState().connection.get('state') === 'CONNECTING') {
          store.dispatch(onReconnected());
        }
        if (postponedActions.length > 0) {
          let actions = {
            prevRev: prevRev(store.getState()),
            actions: postponedActions
          };
          socket.send(JSON.stringify(actions));
          postponedActions = [];
        }
      } else if (action.type === WebsocketAction.MESSAGE) {
        try {
          var message = JSON.parse(action.message.data);

          if (message.nextRev) {
            // TODO check prevRev matching
            next(setRequestToken(message.nextRev));
          }
          if (Array.isArray(message.actions)) {
            if (message.actions.length > 1) {
              return batchActionsTo(next)(message.actions);
            } else if (message.actions.length === 1) {
              return next(message.actions[0]);
            }
          } else if (message.actions.type) {
            return next(message.actions);
          }
        } catch (e) {
          if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
            console.error(e); //eslint-disable-line no-console
          }
          throw e;
        }
      }
      return next(action);
    };
  };


export {
  connectToWebsocket,
  websocketMiddleware
}
