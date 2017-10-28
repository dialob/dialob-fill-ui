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
import {ChoiceQuestion} from './ChoiceQuestion';
import Select from 'react-select';
import PropTypes from 'prop-types';

import 'react-select/dist/react-select.css';

// Form item for dropdown selection with autocomplete controls
class ChoiceAutocompleteQuestion extends ChoiceQuestion {

  static get contextTypes() {
    return {
      valueSetById: PropTypes.func.isRequired
    };
  }

  onChange(value) {
    this.props.answerQuestion(this.props.question[0], value ? value.value : null);
  }

  choiceList() {
    let choices = [];
    let valueSet = this.context.valueSetById(this.props.question[1].get('valueSetId'));
    if (valueSet) {
      choices = valueSet.toJS().map(e => ({value: e.key, label: e.value}));
    }
    return choices;
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
       <div className={this.getStyles()}>
        <Label htmlFor={this.getControlId()} required={this.isRequired()}>{q.get('label')}</Label>
        {this.renderDescription()}
        <Select inputProps={{id: this.getControlId()}} name={q.get('id')} value={q.get('value')} onChange={this.onChange.bind(this)} options={options} placeholder='-'/>
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

export const ChoiceAutocompleteQuestionConnected = connectToAnswer(ChoiceAutocompleteQuestion);

export {
  ChoiceAutocompleteQuestionConnected as default,
  ChoiceAutocompleteQuestion
};
