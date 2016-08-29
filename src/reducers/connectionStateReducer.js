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
import Immutable from 'immutable';

export function connectionStateReducer(state = Immutable.Map(),action) {
  if (action) {
    switch (action.type) {
      case WebsocketAction.OPEN:
        return state
          .delete('connection')
          .setIn(['connection','state'], 'OPEN');
      case WebsocketAction.CONNECTING:
        return state
          .delete('connection')
          .setIn(['connection','state'], 'CONNECTING');
      case WebsocketAction.ERROR:
        return state
          .setIn(['connection','state'], 'ERROR');
      case WebsocketAction.CLOSE:
        return state
          .setIn(['connection','state'], 'CLOSED')
          .setIn(['connection','closed'], Date.now())
          .setIn(['connection','close','code'], action.close.code)
          .setIn(['connection','close','reason'], action.close.reason)
          .setIn(['connection','close','wasClean'], action.close.wasClean);
      case WebsocketAction.NOTIFY_SERVER_ERROR:
        return state.setIn(['connection','serverError'], Immutable.fromJS({
          message: action.message,
          trace: action.trace
        }));
      case WebsocketAction.CLEAR_SERVER_ERROR_NOTIFICATION:
        return state.deleteIn(['connection','serverError']);
    }
  }
  return state;
}
