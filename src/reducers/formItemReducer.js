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
import {mapReducerToNs} from './reducerUtils';

function newQuestion(state, question) {
  if (!question || !question.id) {
    throw new Error('question or id is undefined');
  }
  return state.setIn([question.id], Immutable.fromJS(question));
}

function formItemReducer(state, action) {
  if (!state) {
    return Immutable.Map({});
  }
  switch (action.type) {
    case ActionConstants.NEW_VALUE_SET:
      return state.setIn(['valueSets',action.valueSet.id], Immutable.fromJS(action.valueSet));
    case ActionConstants.UPDATE_VALUE_SET:
      return state.mergeIn(['valueSets',action.valueSet.id], Immutable.fromJS(action.valueSet));
    case ActionConstants.REMOVE_VALUE_SET:
      return state.deleteIn(['valueSets',action.valueSetId]);
    case ActionConstants.FOCUS_QUESTION:
      return state.set('focusedQuestionId', action.questionId);
    case ActionConstants.NEW_QUESTION:
      return newQuestion(state, action.question);
    case ActionConstants.REMOVE_QUESTION:
      if (!action.questionId) {
        throw new Error('question or id is undefined');
      }
      return state.deleteIn([action.questionId]);
    case ActionConstants.UPDATE_QUESTION:
      if (!action.question || !action.question.id) {
        throw new Error('question or id is undefined');
      }
      return state.mergeIn([action.question.id], action.question);
    case ActionConstants.ANSWER_QUESTION:
      if (!action.questionId) {
        throw new Error('questionId is undefined');
      }
      return state.mergeIn([action.questionId], {value: action.answer});
    case ActionConstants.NEW_ERROR:
      if (!action.error || !action.error.id) {
        throw new Error('error or id is undefined');
      }
      return state.setIn([action.error.id, 'errors', action.error.description], action.error.description);
    case ActionConstants.REMOVE_ERROR:
      if (!action.error || !action.error.id) {
        throw new Error('error or id is undefined');
      }
      return state.deleteIn([action.error.id, 'errors', action.error.description]);
    case ActionConstants.REMOVE_ALL:
      return Immutable.Map({});
    case ActionConstants.ACTIVATED:
      return state.setIn(['metadata','sessionStatus'], 'ACTIVE');
    case ActionConstants.WILL_PASSIVATE:
      return state.setIn(['metadata','sessionStatus'], 'PASSIVE');
    case ActionConstants.COMPLETE_QUESTIONNAIRE:
      if (action.serverEvent === true) {
        return state.setIn(['metadata', 'status'], 'COMPLETED');
      }
  }
  return state;
}

const formItemReducerInData = mapReducerToNs('data',formItemReducer);

// export default store;
export {
  formItemReducerInData as default,
  formItemReducer
};
