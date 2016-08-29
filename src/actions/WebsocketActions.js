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

import * as WebsocketAction from './WebsocketActionConstants';

export function onOpen(open) {
  return {
    type: WebsocketAction.OPEN,
    serverEvent: true,
    open: open
  };
}

export function onMessage(message) {
  return {
    type: WebsocketAction.MESSAGE,
    serverEvent: true,
    message: message
  };
}

export function onError(error) {
  return {
    type: WebsocketAction.ERROR,
    serverEvent: true,
    error: error
  };
}

export function onClose(close) {
  return {
    type: WebsocketAction.CLOSE,
    serverEvent: true,
    close: close
  };
}

export function onReconnected() {
  return {
    type: WebsocketAction.RECONNECTED,
    serverEvent: true
  };
}
