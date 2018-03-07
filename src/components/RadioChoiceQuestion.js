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
import PropTypes from 'prop-types';
import {Form, Checkbox} from 'semantic-ui-react';

// Form item for dropdown selection controls
class RadioChoiceQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: PropTypes.func.isRequired
    };
  }

  onChange(event, data) {
    this.props.answerQuestion(this.props.question[0], data.value);
  }

  option(name, value, label, checked) {
    return (
      <div key={name + value}>
        <Checkbox key={name + value} radio label={label} name={name} value={value} checked={checked} onChange={this.onChange.bind(this)} />
      </div>
    );
  }

  choiceList() {
    let choices = [];
    let q = this.props.question[1];
    let valueSet = this.context.valueSetById(this.props.question[1].get('valueSetId'));
    if (valueSet) {
      choices = valueSet.map(e => this.option(q.get('id'), e.get('key'), e.get('value'), e.get('key') === q.get('value')));
    }
    return choices.toJS();
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
       <Form.Field required={this.isRequired()}>
          <Label>{q.get('label')}</Label>
          { this.renderDescription() }
          {options}
          <Errors errors={q.get('errors')} />
       </Form.Field>
    );
  }
}

export const RadioChoiceQuestionConnected = connectToAnswer(RadioChoiceQuestion);

export {
  RadioChoiceQuestionConnected as default,
  RadioChoiceQuestion
};
