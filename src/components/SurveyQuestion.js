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

// Form item for survey choices
class SurveyQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: React.PropTypes.func.isRequired,
      surveyValueSet: React.PropTypes.func.isRequired
    };
  }

  onChange(value) {
   this.props.answerQuestion(this.props.question[0], value);
  }

  option(key) {
    let q = this.props.question[1];
    return (
      <span key={key}>
        <input type='radio' name={q.get('id')} value={key} checked={q.get('value') === key} onChange={this.onChange.bind(this, key)} />
      </span>
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
      <div className={this.getStyles()}>
        <span className='dialob-survey-content'>
          <Label htmlFor={q.get('id')} required={this.isRequired()}>{q.get('label')}</Label>
          {options}
        </span>
        { this.renderDescription() }
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

export const SurveyQuestionConnected = connectToAnswer(SurveyQuestion);

export {
  SurveyQuestionConnected as default,
  SurveyQuestion
};
