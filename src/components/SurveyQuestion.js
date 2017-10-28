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
import Item from './Item';
import Label from './Label';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// Form item for survey choices
class SurveyQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: PropTypes.func.isRequired,
      surveyValueSet: PropTypes.func.isRequired
    };
  }

  onChange(value) {
   this.props.answerQuestion(this.props.question[0], value);
  }

  option(key) {
    let q = this.props.question[1];
    return (
      <div className='dialob-survey-option' key={key}>
        <input type='radio' name={q.get('id')} value={key} checked={q.get('value') === key} onChange={this.onChange.bind(this, key)} />
      </div>
    );
  }

  choiceList() {
    let choices = [];
    let valueSet = this.context.surveyValueSet();
    if (valueSet) {
      choices = valueSet.map(e => this.option(e.get('key')));
    }
    return choices;
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
      <div className={classnames('dialob-survey-question', {'dialob-survey-errors': this.hasErrors()})}>
        <div className='dialob-survey-question-label'>
          <Label htmlFor={q.get('id')} required={this.isRequired()}>{q.get('label')}</Label>
        </div>
        {options}
      </div>
    );
  }
}

export const SurveyQuestionConnected = connectToAnswer(SurveyQuestion);

export {
  SurveyQuestionConnected as default,
  SurveyQuestion
};
