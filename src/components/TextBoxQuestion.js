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
import {TextQuestion} from './TextQuestion';
import Label from './Label';
import {connectToAnswer} from '../utils/formUtils';
import {Form, TextArea} from 'semantic-ui-react';

// How many lines to grow the input area before displaying a scrollbar
const MAX_LINES = 25;

// Item for multi-line (textbox) questions
class TextBoxQuestion extends TextQuestion {

  /*
  onChangeText(event) {
    super.onChangeText(event);
  }
  */

  render() {
    let q = this.props.question[1];
    return (
      <Form.Field required={this.isRequired()}>
        <Label htmlFor={this.getControlId()}>{q.get('label')}</Label>
        { this.renderDescription() }
        <TextArea id={this.getControlId()} name={q.get('id')} type={this.props.entryType} value={this.state.value || ''} onChange={this.onChangeText.bind(this)} autoHeight />
        <Errors errors={q.get('errors')} />
      </Form.Field>
    );
  }
}

export const TextBoxQuestionConnected = connectToAnswer(TextBoxQuestion);

export {
 TextBoxQuestionConnected as default,
 TextBoxQuestion
};
