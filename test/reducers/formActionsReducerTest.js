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

import { formActionsReducer } from 'reducers/formActionsReducer';
import sinon from 'sinon';
import Immutable, {fromJS,toJS} from 'immutable';

describe('formActionsReducer',() => {
    it('returns UNLOADED initial state',() => {
        let state = formActionsReducer(null,{type: null});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'UNLOADED',
          items: {}
        });
    });
    it('QUESTIONNAIRE_NOT_FOUND resets state and sets status NOT_FOUND',() => {
        let state = formActionsReducer(null,{type:'QUESTIONNAIRE_NOT_FOUND'});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'NOT_FOUND',
          items: {}
        });
    });

    it('REMOVE_ALL resets state and sets status UNLOADED',() => {
        let state = formActionsReducer(Immutable.fromJS({status:'LOADED'}),{type:'REMOVE_ALL'});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'UNLOADED',
          items: {}
        });
    });
    it('NEW_QUESTION adds question to items',() => {
        let state = formActionsReducer(fromJS({status:'LOADED',items:{}}),{type:'NEW_QUESTION',question: {id:'first'}});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'LOADED',
          items: {
              first: {
                  id: 'first'
              }
          }
        });
    });
    it('REMOVE_QUESTION removes question from items',() => {
        let state = formActionsReducer(fromJS({status:'LOADED',items:{}}),{type:'REMOVE_QUESTION',questionId: 'first'});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'LOADED',
          items: { }
        });
    });

    it('UPDATE_QUESTION updates question attributes',() => {
        let state = formActionsReducer(fromJS({status:'LOADED',
            items: {
              first: {
                  id: 'first',
                  className: ['a'],
                  value: '321'
              }
            }
        }),{type:'UPDATE_QUESTION',question: {id:'first',value:'123'}});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'LOADED',
          items: {
              first: {
                  id: 'first',
                  className: ['a'],
                  value: '123'
              }
          }
        });
    });

    it('questionnaire is maintained outside items ',() => {
        let state = formActionsReducer(fromJS({status:'LOADED',items:{}}),{type:'NEW_QUESTION',question: {id:'questionnaire', type: 'questionnaire'}});
        state = state.toJS();
        expect(state).to.deep.equal({
          status: 'LOADED',
          questionnaire: {
              id:'questionnaire',
              type: 'questionnaire'
          },
          items: {}
        });
    });


})
