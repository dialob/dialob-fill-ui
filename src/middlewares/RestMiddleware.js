/**
 *  Copyright 2017 ReSys OÜ
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

import {batchActionsTo} from '../utils/batchActionsTo';
import {setRequestToken} from '../actions/Actions';
import {onOpen} from '../actions/WebsocketActions';
import * as Actions from '../actions/ActionConstants';
import 'whatwg-fetch';

const SOCKET_ACTIONS = [
  Actions.ANSWER_QUESTION,
  Actions.COMPLETE_QUESTIONNAIRE,
  Actions.NEXT_PAGE,
  Actions.PREVIOUS_PAGE,
  Actions.WAKE_UP,
  Actions.CONNECT,
  Actions.ADD_ROW,
  Actions.DELETE_ROW
];

function dispatchServerActions(message, dispatch) {
  if (message.nextRev) {
    // TODO check prevRev matching
    dispatch(setRequestToken(message.nextRev));
  }
  if (Array.isArray(message.actions)) {
    if (message.actions.length > 1) {
      return batchActionsTo(dispatch)(message.actions);
    } else if (message.actions.length === 1) {
      return dispatch(message.actions[0]);
    }
  } else if (message.actions.type) {
    return dispatch(message.actions);
  }
}

function getFullState(csrf, url, dispatch) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    };
    if (csrf && csrf.headerName) {
      headers[csrf.headerName] = csrf.token;
    }
    var options = {
      method: 'get',
      credentials: "same-origin",
      headers
    }
    fetch(url, options)
      .then(resoponse => resoponse.json())
      .then(message => {
        dispatchServerActions(message, dispatch);
        dispatch(onOpen(true));
      })
      .catch(error => console.error('Fetch failed', error));
}

function postActions(csrf, url, actions, dispatch) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    };
   if (csrf && csrf.headerName) {
      headers[csrf.headerName] = csrf.token;
    }
    var options = {
      method: 'post',
      body : JSON.stringify(actions),
      credentials: "same-origin",
      headers
    }
    fetch(url, options)
      .then(resoponse => resoponse.json())
      .then(message => {
        dispatchServerActions(message, dispatch);
      })
      .catch(error => console.error('Fetch failed', error));
}

const prevRev = (state) => state.connection.get('token');

const restMiddleware = store =>  {
  if (store.getState().config.toJS().connectionMode !== 'rest') {
    return next => action => next(action);
  }
  var restSessionUrl = store.getState().config.get('restUrl');
  var csrf = store.getState().config.get('csrf');
  if (store.getState().data.get('status') === 'UNLOADED') {
       getFullState(csrf, restSessionUrl, action => store.dispatch(action));
  }
  return next => action => {
    if (SOCKET_ACTIONS.indexOf(action.type) < 0) {
        // Ignore non-rest actions
        return next(action);
    }
    if (!action.serverEvent) {
      let actions = {
            prevRev: prevRev(store.getState()),
            actions: [action]
      };
      postActions(csrf, restSessionUrl, actions, action => next(action));
    }
    return next(action);
  }
}

export {
  restMiddleware
};
