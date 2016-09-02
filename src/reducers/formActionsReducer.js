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

const NOT_FOUND = 'NOT_FOUND';
const UNLOADED = 'UNLOADED';
const LOADED = 'LOADED';
const ACTIVE = 'ACTIVE';
const PASSIVE = 'PASSIVE';

const QUESTIONNAIRE_NOT_FOUND_STATE = Immutable.fromJS({
  status: NOT_FOUND,
  items: {}
});
const EMPTY_QUESTIONNAIRE_STATE = Immutable.fromJS({
  status: UNLOADED,
  items: {}
});

function setLoaded(state) {
    if (state.get('status') !== LOADED) {
        return state.set('status', LOADED);
    }
    return state;
}

function isQuestionnaire(question) {
    return question && question.type === 'questionnaire';
}

function newQuestion(state, question) {
  let questionItem = Immutable.fromJS(question);
  if (isQuestionnaire(question)) {
    state = setLoaded(state).set('questionnaire', questionItem);
  }
  return state.setIn(['items',question.id], questionItem);
}

function updateQuestion(state, question) {
  let questionItem = Immutable.fromJS(question);
  if (isQuestionnaire(question)) {
    state = state.merge('questionnaire', questionItem);
  }
  return state.mergeIn(['items',question.id], questionItem);
}

function removeQuestion(state, questionId) {
  return state.deleteIn(['items',questionId]);
}

export function formActionsReducer(state = EMPTY_QUESTIONNAIRE_STATE, action) {
  let currentStatus = state.get('status');
  switch (action.type) {
    case ActionConstants.QUESTIONNAIRE_NOT_FOUND:
      return QUESTIONNAIRE_NOT_FOUND_STATE;
    case ActionConstants.REMOVE_ALL:
      return EMPTY_QUESTIONNAIRE_STATE

    case ActionConstants.NEW_VALUE_SET:
      return state.setIn(['valueSets',action.valueSet.id], Immutable.fromJS(action.valueSet));
    case ActionConstants.UPDATE_VALUE_SET:
      return state.mergeIn(['valueSets',action.valueSet.id], Immutable.fromJS(action.valueSet));
    case ActionConstants.REMOVE_VALUE_SET:
      return state.deleteIn(['valueSets',action.valueSetId]);
    case ActionConstants.FOCUS_QUESTION:
      var prevFocus = state.get('focusOn');
      state = state.set('focusOn', action.questionId);
      if (action.questionId) {
        state = state.setIn(['items',action.questionId,focused], true);
      }
      if (prevFocus) {
        state = state.setIn(['items',prevFocus,focused], false);
      }
      return state;

    case ActionConstants.NEW_QUESTION:
      return newQuestion(state, action.question);
    case ActionConstants.REMOVE_QUESTION:
      return removeQuestion(state, action.questionId);
    case ActionConstants.UPDATE_QUESTION:
      return updateQuestion(state, action.question);
    case ActionConstants.ANSWER_QUESTION:
      if (!action.questionId) {
        throw new Error('questionId is undefined');
      }
      return state.mergeIn(['items',action.questionId], {value: action.answer});
    case ActionConstants.NEW_ERROR:
      if (!action.error || !action.error.id) {
        throw new Error('error or id is undefined');
      }
      return state.setIn(['items',action.error.id, 'errors', action.error.description], action.error.description);
    case ActionConstants.REMOVE_ERROR:
      if (!action.error || !action.error.id) {
        throw new Error('error or id is undefined');
      }
      return state.deleteIn(['items',action.error.id, 'errors', action.error.description]);
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

