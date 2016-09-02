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

import {connect} from 'react-redux';
import {answerQuestion} from '../actions/Actions';

//
// Find questionnaire as a root object
// Assuming there is always a 'questionnaire' present, and there is always one of them per form.
//
function findQuestionnaire(data) {
  if (!data) {
    return null;
  }
  var questionnaire = data.get('questionnaire');
  if (questionnaire) {
    return [questionnaire.id, questionnaire];
  }
  return null;
}

//
// Find item by ID from state
//
function findItemById(data, id) {
	let itemData = data.getIn(['items',id]);
	if (itemData) {
		return [id,itemData];
	}
	return null;
}

//
// Find valueset by ID from state
//
function findValuesetById(data, id) {
  let valueSet = data.getIn(['valueSets', id, 'entries']);
  return valueSet ? valueSet : null;
}

function connectToAnswer(component) {
	return connect(null,{
		answerQuestion
	})(component);
}

export {
	findQuestionnaire,
	findItemById,
	findValuesetById,
	connectToAnswer
}
