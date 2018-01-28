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
import classnames from 'classnames';
import Item from './Item';
import Label from './Label';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Checkbox, Form} from 'semantic-ui-react';

// Form item for boolean (yes/no) questions
class BooleanQuestion extends Item {

  onChange(event, data) {
    this.props.answerQuestion(this.props.question[0], data.checked);
  }

  render() {
    let q = this.question;
    if (!q) {
      return null;
    }
    let rawValue = q.get('value');
    let value = null;
    if (rawValue === true || rawValue === 'true') {
      value = true;
    } else if (rawValue === false || rawValue === 'false') {
      value = false;
    }
    return (
      <Form.Field required={this.isRequired()}>
        <Label htmlFor={this.getControlId()}>{q.get('label')}</Label>
        { this.renderDescription() }
        <Checkbox toggle fitted onChange={this.onChange.bind(this)} checked={value === true} />
        <Errors errors={q.get('errors')} />
      </Form.Field>
    );
  }
}

export const BooleanQuestionConnected = connectToAnswer(injectIntl(BooleanQuestion));

export {
  BooleanQuestionConnected as default,
  BooleanQuestion
};
