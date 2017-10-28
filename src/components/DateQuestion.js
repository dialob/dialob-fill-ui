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

// Item for Date and Time questions
class DateQuestion extends Item {

  static get propTypes() {
    return {
      entryType: PropTypes.oneOf(['date', 'time'])
    };
  }

  static get defaultProps() {
    return {
      entryType: 'date'
    };
  }

  formatDate(dateStr) {
    if (dateStr) {
      return new Date(dateStr).toLocaleString();
    } else {
      return '';
    }
  }

  onChange(event) {
    this.props.answerQuestion(this.props.question[0], event.target.value);
  }

  render() {
    let q = this.props.question[1];
    let dateValue = q.get('value');
    return (
      <div className={this.getStyles()}>
        <Label htmlFor={this.getControlId()} required={this.isRequired()}>{q.get('label')}</Label>
        {this.renderDescription()}
        <input id={this.getControlId()} ame={q.get('id')} type={this.props.entryType} value={dateValue} onChange={this.onChange.bind(this)} />
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

const DateQuestionConnected = connectToAnswer(DateQuestion);

export {
  DateQuestionConnected as default,
  DateQuestion
};
