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

import * as redux from 'redux';
import {reducer} from '../reducers';
import {middleware} from '../middlewares';
import Immutable from 'immutable';

const DEFAULT_INITIAL_STATE = {
    config: Immutable.Map({
        url: 'http://localhost:8080/sockjs'
    })
};

export function createStore(initialState = DEFAULT_INITIAL_STATE) {
    if (initialState.config) {
        initialState.config = Immutable.Map(initialState.config);
    }
    return redux.createStore(reducer, initialState, middleware);
}
