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
import Label from './Label';
import {ChoiceAutocompleteQuestion} from './ChoiceAutocompleteQuestion';
import Select from 'react-select';
import {List} from 'immutable';

import 'react-select/dist/react-select.css';

// Form item for multi-choice dropdown selection with autocomplete controls
class MultiChoiceAutocompleteQuestion extends ChoiceAutocompleteQuestion {

  static get contextTypes() {
    return {
      valueSetById: React.PropTypes.func.isRequired
    };
  }

  onChange(value) {
    this.props.answerQuestion(this.props.question[0], value ? new List(value.map(v => v.value)) : null);
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    let value = q.get('value') ? q.get('value').toJS() : null;
    return (
       <div className={this.getStyles()}>
        <Label htmlFor={this.getControlId()} required={this.isRequired()}>{q.get('label')}</Label>
        <Select inputProps={{id: this.getControlId()}} multi={true} name={q.get('id')} value={value} onChange={this.onChange.bind(this)} options={options} placeholder='-'/>
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

export const MultiChoiceAutocompleteQuestionConnected = connectToAnswer(MultiChoiceAutocompleteQuestion);

export {
  MultiChoiceAutocompleteQuestionConnected as default,
  MultiChoiceAutocompleteQuestion
};
