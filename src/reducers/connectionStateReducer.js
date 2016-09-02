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

import * as WebsocketAction from '../actions/WebsocketActionConstants';
import * as ActionConstants from '../actions/ActionConstants';
import Immutable from 'immutable';

const OPEN_STATE = Immutable.Map().set('state', 'OPEN');
const CONNECTING_STATE = Immutable.Map().set('state', 'CONNECTING');
const ERROR_STATE = Immutable.Map().set('state', 'OPEN');
const CLOSED_STATE = Immutable.Map().set('state', 'CLOSED');

export function connectionStateReducer(state = CLOSED_STATE,action) {
  if (action) {
    switch (action.type) {
      case ActionConstants.SET_REQUEST_TOKEN:
        return state.set('token', action.token);
      case WebsocketAction.OPEN:
        return OPEN_STATE;
      case WebsocketAction.CONNECTING:
        return CONNECTING_STATE;
      case WebsocketAction.ERROR:
        return ERROR_STATE;
      case WebsocketAction.CLOSE:
        return CLOSED_STATE
          .set('closed', Date.now())
          .setIn(['close','code'], action.close.code)
          .setIn(['close','reason'], action.close.reason)
          .setIn(['close','wasClean'], action.close.wasClean);
      case WebsocketAction.NOTIFY_SERVER_ERROR:
        return state.set('serverError', Immutable.fromJS({
          message: action.message,
          trace: action.trace
        }));
      case WebsocketAction.CLEAR_SERVER_ERROR_NOTIFICATION:
        return state.delete('serverError');
    }
  }
  return state;
}
