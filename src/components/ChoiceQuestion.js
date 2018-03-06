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
import {Form, Select} from 'semantic-ui-react';

// Form item for dropdown selection controls
class ChoiceQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: PropTypes.func.isRequired
    };
  }

  onChange(event, data) {
    this.props.answerQuestion(this.props.question[0], data.value);
  }

  option(key, value) {
    return (<option key={key} value={key}>{value}</option>);
  }

  choiceList() {
    let choices = [];
    let valueSet = this.context.valueSetById(this.props.question[1].get('valueSetId'));
    let value = this.props.question[1].get('value');
    if (valueSet) {
      choices = valueSet.toJS().map(e => ({key: e.key, value: e.key, text: e.value}));
    }
    return choices;
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
      <Form.Field required={this.isRequired()}>
        <Label htmlFor={this.getControlId()}>{q.get('label')}</Label>
        { this.renderDescription() }
        <Select name={q.get('id')} value={q.get('value')} onChange={this.onChange.bind(this)} options={options} search={this.props.autocomplete}/>
        <Errors errors={q.get('errors')} />
      </Form.Field>
    );
  }
}

export const ChoiceQuestionConnected = connectToAnswer(ChoiceQuestion);

export {
  ChoiceQuestionConnected as default,
  ChoiceQuestion
};
