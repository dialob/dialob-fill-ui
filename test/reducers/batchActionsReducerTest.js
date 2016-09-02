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

import { batchActionsReducer } from 'reducers/batchActionsReducer';
import sinon from 'sinon';
import Immutable from 'immutable';

const nullReducer = (state,action) => state;

describe('batchActionsReducer', () => {

    it('accepts null as initial state', () => {
        var reducer = batchActionsReducer(nullReducer);

        var initialState = reducer(null,{type:'MOCK_ACTION'});

        expect(initialState).not.to.equal(null);
        expect(initialState).to.deep.equal({});

        initialState = reducer({},{type:'MOCK_ACTION'});

        expect(initialState).not.to.equal(null);
        expect(initialState).to.deep.equal({});
    });

    it('BATCH_ACTIONS action prepares action', () => {
        var mockReducer = sinon.mock();
        mockReducer.never();
        var reducer = batchActionsReducer(mockReducer);

        var state = reducer(null,{type:'BATCH_ACTIONS'});

        expect(state).to.have.property('actions');
        expect(state.actions).is.an.instanceof(Immutable.List);
        expect(state.actions).to.be.empty;
        mockReducer.verify();

    });

    it('collects actions on actions-property, if it exists', () => {
        var mockReducer = sinon.mock();
        mockReducer.never();
        var reducer = batchActionsReducer(mockReducer);
        var actions = Immutable.List();

        var state = reducer({actions},{type:'MOCK_ACTION'});

        expect(state.actions.size).to.equal(1);
        expect(state.actions.get(0).toJS()).to.deep.equal({type:'MOCK_ACTION'});
        mockReducer.verify();
    });

    it('when actions-property is not define, actions are delegated to reducer', () => {
        var mockReducer = sinon.mock();
        mockReducer.once().withArgs({other: "state"},{type: 'MOCK_ACTION'}).returnsArg(0);
        var reducer = batchActionsReducer(mockReducer);

        var state = reducer({other: "state"},{type:'MOCK_ACTION'});

        expect(state).not.to.have.property('actions');
        expect(state).to.have.property('other');
        mockReducer.verify();
    });



    it('BATCH_COMMIT flushes all actions to delegate reducer and removes actions property', () => {
        var mockReducer = sinon.mock();
        mockReducer.once().withArgs({},{type: 'MOCK_ACTION'}).returnsArg(0);
        var reducer = batchActionsReducer(mockReducer);

        var state = reducer({actions: Immutable.fromJS([{type: 'MOCK_ACTION'}])},{type:'BATCH_COMMIT'});

        expect(state).not.to.have.property('actions');
        mockReducer.verify();
    });

});
