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

import * as ActionConstants from './ActionConstants';

export function setRequestToken(token) {
  return {
    type: ActionConstants.SET_REQUEST_TOKEN,
    token: token
  };
}

export function answerQuestion(questionId, answer) {
  return {
    type: ActionConstants.ANSWER_QUESTION,
    questionId: questionId,
    answer: answer
  };
}

export function wakeUp() {
  return {
    type: ActionConstants.WAKE_UP
  };
}

export function nextPage() {
  return {
    type: ActionConstants.NEXT_PAGE
  };
}

export function previousPage() {
  return {
    type: ActionConstants.PREVIOUS_PAGE
  };
}

export function completeQuestionnaire() {
  return {
    type: ActionConstants.COMPLETE_QUESTIONNAIRE
  };
}

export function connect() {
  return {
    type: ActionConstants.CONNECT
  };
}

export function addRow(rowGroupId) {
  return {
    type: ActionConstants.ADD_ROW,
    id: rowGroupId
  };
}

export function deleteRow(rowId) {
  return {
    type: ActionConstants.DELETE_ROW,
    id: rowId
  };
}

export function setLanguage(language) {
  return {
    type: ActionConstants.SET_LANGUAGE,
    language
  };
}
