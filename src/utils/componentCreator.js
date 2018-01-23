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

import React from 'react';
import TextQuestion from '../components/TextQuestion';
import TextBoxQuestion from '../components/TextBoxQuestion';
import BooleanQuestion from '../components/BooleanQuestion';
import ChoiceQuestion from '../components/ChoiceQuestion';
import ChoiceAutocomplete from '../components/ChoiceAutocompleteQuestion';
import DateQuestion from '../components/DateQuestion';
import TimeQuestion from '../components/TimeQuestion';
import Group from '../components/Group';
import SurveyGroup from '../components/SurveyGroup';
import SurveyQuestion from '../components/SurveyQuestion';
import RowGroup from '../components/RowGroup';
import Note from '../components/Note';
import MultiChoiceQuestion from '../components/MultiChoiceQuestion';
import MultiChoiceAutocompleteQuestion from '../components/MultiAutocompleteQuestion';
import RadioChoiceQuestion from '../components/RadioChoiceQuestion';
import {findItemById} from './formUtils';

// TODO: Make this extendable
function componentCreator(question) {
  if (!question) {
    return null;
  }

  let id = question[0];
  let type = question[1].get('type');
  let className = question[1].get('className');
  let hasClass = name => className && className.contains(name);
  switch (type) {
    case 'text':
      if (question[1].get('valueSetId')) { // TODO: Remove this workaround...
        if (hasClass('autocomplete')) {
          return <ChoiceAutocomplete key={id} question={question} />;
        } else if (hasClass('radio')) {
        return <RadioChoiceQuestion key={id} question={question} />;
        } else {
          return <ChoiceQuestion key={id} question={question} />;
        }
      } else {
        if (hasClass('textbox')) {
          return <TextBoxQuestion key={id} question={question} />
        } if (hasClass('survey')) {
          return <SurveyQuestion key={id} question={question} />
        } else {
          return <TextQuestion key={id} question={question} />;
        }
      }
    case 'number':
      return <TextQuestion key={id} question={question} entryType='number' />;
    case 'decimal':
      return <TextQuestion key={id} question={question} entryType='number' />;
    case 'boolean':
      return <BooleanQuestion key={id} question={question} />;
    case 'list':
      if (hasClass('autocomplete')) {
        return <ChoiceAutocomplete key={id} question={question} />;
      } else if (hasClass('radio')) {
        return <RadioChoiceQuestion key={id} question={question} />;
      } else {
        return <ChoiceQuestion key={id} question={question} />;
      }
    case 'date':
      return <DateQuestion key={id} question={question}/>;
    case 'time':
      return <TimeQuestion key={id} question={question}/>;
    case 'note':
      return <Note key={id} question={question} />;
    case 'group':
      if (hasClass('survey')) {
        return <SurveyGroup key={id} group={question}/>
      } else {
        return <Group key={id} group={question}/>;
      }
    case 'rowgroup':
      return <RowGroup key={id} group={question}/>;
    case 'array':
      if (hasClass('autocomplete')) {
        return <MultiChoiceAutocompleteQuestion key={id} question={question} />;
      } else {
        return <MultiChoiceQuestion key={id} question={question} />;
      }
    default:
      if (process.env.NODE_ENV !== 'production') {  //eslint-disable-line no-undef
        console.warn('Unknown question type', type); //eslint-disable-line no-console
      }
  }
  return null;
}

function componentCreatorState(data,create,itemId) {
  var item = null;
  if (typeof itemId === 'string') {
    item = findItemById(data, itemId); //this.props.itemById(itemId);
  } else {
    item = [itemId.get('id'),itemId];
  }
  if (item) {
    return create(item);
  }
  return null;
}

export {
  componentCreator,
  componentCreatorState
};
