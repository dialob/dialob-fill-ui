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
import DateQuestion from '../components/DateQuestion';
import Group from '../components/Group';
import Note from '../components/Note';
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
        return <ChoiceQuestion key={id} question={question} />;
      } else {
        if (hasClass('textbox')) {
          return <TextBoxQuestion key={id} question={question} />
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
      return <ChoiceQuestion key={id} question={question} />;
    case 'date':
      return <DateQuestion key={id} question={question} entryType='date'/>;
    case 'time':
      return <DateQuestion key={id} question={question} entryType='time' />;
    case 'note':
      return <Note key={id} question={question} />;
    case 'group':
      return <Group key={id} group={question}/>;
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
