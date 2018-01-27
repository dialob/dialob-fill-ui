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
import Errors from './Errors';
import Item from './Item';
import Label from './Label';
import {connectToAnswer} from '../utils/formUtils';
import PropTypes from 'prop-types';
import {Form, Input} from 'semantic-ui-react';

// In how many milliseconds after last keypress the value is sent to back-end
const SAVE_DELAY = 300;

// Item for single-line text and numeric (integer, decimal) questions
class TextQuestion extends Item {

  static get propTypes() {
    return {
      entryType: PropTypes.oneOf(['text', 'number'])
    };
  }

  static get defaultProps() {
    return {
      entryType: 'text'
    };
  }

 constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      value: this.question ? this.question.get('value') : '',
      cursorPos: 0
    };
  }

  onChangeText(event) {
    let value = event.target.value;
    if (value === '') {
      value = null;
    }
    this.setState({value});
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.props.answerQuestion(this.props.question[0], value), SAVE_DELAY);
  }

  componentWillReceiveProps(nextProps) {
    if (this.inputField !== document.activeElement) {
      this.setState({value: nextProps.question[1].get('value')});
    }
  }

  render() {
    let q = this.question;
    if (!q) {
      return null;
    }
    return (
      <Form.Field required={this.isRequired()}>
        <Label htmlFor={this.getControlId()}>{q.get('label')}</Label>
        { this.renderDescription() }
        <Input id={this.getControlId()} ref={inputField => this.inputField = inputField} name={q.get('id')} type={this.props.entryType} value={this.state.value || ''} onChange={this.onChangeText.bind(this)} />
        <Errors errors={q.get('errors')} />
      </Form.Field>
    );
  }
}

export const TextQuestionConnected = connectToAnswer(TextQuestion);

export {
  TextQuestionConnected as default,
  TextQuestion
};
