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

import * as ActionConstants from '../actions/ActionConstants';
import Immutable from 'immutable';

export function batchActionsReducer(reducer) {
  return (origState = {}, action) => {
    let state = Object.assign({}, origState);
    if (!state.actions) {
      if (action.type === ActionConstants.BATCH_ACTIONS) {
        state.actions = Immutable.List();
        return state;
      }
      return reducer(state,action);
    } else if (action.type === ActionConstants.BATCH_COMMIT) {
      var actions = state.actions.toJS();
      delete state.actions;
      return actions.reduce(reducer, state);
    } else {
      state.actions = state.actions.push(Immutable.fromJS(action));
      return state;
    }
  };
}
