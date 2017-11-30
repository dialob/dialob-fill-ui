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
import {connectToAnswer} from '../utils/formUtils';
import Errors from './Errors';
import Item from './Item';
import Label from './Label';
import {List} from 'immutable';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';

// Form item for multiple-selection controls
class MultiChoiceQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: PropTypes.func.isRequired
    };
  }

  setOptionValue(key, checked) {
    let value = this.props.question[1].get('value');
    if (!List.isList(value)) {
      value = new List();
    }
    let index = value.findKey(v => v === key);
    let found = (typeof index !== 'undefined');
    if (found && !checked) {
      value = value.remove(index);
    } else if (!found && checked) {
      value = value.push(key);
    }
    this.props.answerQuestion(this.props.question[0], value);
  }

  option(key, label, checked) {
    let name = `${this.props.question[0]}[${key}]`;
    return (
      <span className='dialob-multichoice-option' key={name}>
        <Checkbox id={name} value={checked} onChange={this.setOptionValue.bind(this, key)} />
        <label htmlFor={name}>{label}</label>
      </span>
      );
  }

  choiceList() {
    let choices = [];
    let valueSet = this.context.valueSetById(this.props.question[1].get('valueSetId'));
    let value = this.props.question[1].get('value');
    if (!List.isList(value)) {
      value = new List();
    }
    if (valueSet) {
      choices = valueSet.map(e => this.option(e.get('key'), e.get('value'), value.contains(e.get('key'))));
    }
    return choices;
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
       <div className={this.getStyles()}>
        <Label htmlFor={q.get('id')} required={this.isRequired()}>{q.get('label')}</Label>
        {this.renderDescription()}
        {options}
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

export const MultiChoiceQuestionConnected = connectToAnswer(MultiChoiceQuestion);

export {
  MultiChoiceQuestionConnected as default,
  MultiChoiceQuestion
};
