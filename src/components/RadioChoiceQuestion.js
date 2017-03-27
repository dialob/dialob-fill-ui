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

// Form item for dropdown selection controls
class RadioChoiceQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: React.PropTypes.func.isRequired
    };
  }

  onChange(event) {
    this.props.answerQuestion(this.props.question[0], event.target.value);
  }

  option(name, value, label, checked) {
    return (<label key={name + value} className='dialob-radio-choice-label'>
        <input className='dialob-radio-choice-input' type='radio' name={name} value={value} checked={checked} onChange={this.onChange.bind(this)} />
        <span className='dialob-radio-choice-text'>{label}</span>
      </label>);
  }

  choiceList() {
    let choices = [];
    let q = this.props.question[1];
    let valueSet = this.context.valueSetById(this.props.question[1].get('valueSetId'));
    let value = this.props.question[1].get('value');
    if (valueSet) {
      choices = valueSet.map(e => this.option(q.get('id'), e.get('key'), e.get('value'), e.get('key') === q.get('value')));
    }
    return choices.toJS();
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
       <div className={this.getStyles()}>
        <Label required={this.isRequired()}>{q.get('label')}</Label>
        <div className='dialob-radio-choice-wrapper'>
          {options}
        </div>
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

export const RadioChoiceQuestionConnected = connectToAnswer(RadioChoiceQuestion);

export {
  RadioChoiceQuestionConnected as default,
  RadioChoiceQuestion
};
