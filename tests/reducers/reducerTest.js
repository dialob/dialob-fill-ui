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
/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/

import {buildReducers} from '../../src/reducers';

var reducer = buildReducers(null);

describe('reducer', () => {
    it('accepts null as initial state', () => {
        expect(reducer(null,{type:'MOCK_ACTION'})).not.to.equal(null);
    });

    it('initial state has data status "UNLOADED"', () => {
        var state = reducer({},{type:'MOCK_ACTION'});
        expect(state.data).to.have.property('status').that.equal("UNLOADED");
    });

    it('QUESTIONNAIRE_NOT_FOUND sets data status to NOT_FOUND', () => {
        var state = reducer({},{type:'QUESTIONNAIRE_NOT_FOUND'});
        expect(state.data).to.have.property('status').that.equal('NOT_FOUND');
    });

    it('REMOVE_ALL resets data status to "UNLOADED"', () => {
        var state = reducer({},{type:'QUESTIONNAIRE_NOT_FOUND'});
        state = reducer(state,{type:'REMOVE_ALL'});
        expect(state.data).to.have.property('status').that.equal('UNLOADED');
    });

    it('initial connection state is CLOSED', () => {
        var state = reducer({},{type:''});
        expect(state.connection).to.have.property('state').that.equal('CLOSED');
    });

});
