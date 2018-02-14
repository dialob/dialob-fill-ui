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
import {connectToAnswer} from '../utils/formUtils';
import Item from './Item';
import Label from './Label'
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';

const DEFAULT_LOCALE = 'en';

// Item for Date question
class DateQuestion extends Item {

  handleDayChange(day, modifiers) {
    if (day) {
      let value = moment(day).format('YYYY-MM-DD');
      this.props.answerQuestion(this.props.question[0], value);
    }
  }

  render() {
    let q = this.props.question[1];
    let value = q.get('value');
    let dateValue = value ? moment(value).toDate() : null;
    return (
      <Form.Field required={this.isRequired()}>
        <Label htmlFor={this.getControlId()}>{q.get('label')}</Label>
        { this.renderDescription() }
        <DayPickerInput
          onDayChange={this.handleDayChange.bind(this)}
          value={dateValue || ''}
          formatDate={formatDate}
          parseDate={parseDate}
          format="L"
          placeholder={`${dateValue ? formatDate(dateValue, 'L', this.props.locale) : ''}`}
          dayPickerProps={{
            locale: this.props.locale,
            localeUtils: MomentLocaleUtils,
          }}
         />
        <Errors errors={q.get('errors')} />
      </Form.Field>
    );
  }
}

const DateQuestionConnected = connectToAnswer(injectIntl(DateQuestion));

export {
  DateQuestionConnected as default,
  DateQuestion
};
