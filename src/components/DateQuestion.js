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
import Pikaday from 'pikaday';
import moment from 'moment';
import {dateformats} from './dateformats';
import { injectIntl } from 'react-intl';

const DEFAULT_LOCALE = 'en';

// Item for Date question
class DateQuestion extends Item {

  constructor(props) {
    super();
    let q = props.question[1];
    let dateValue = q.get('value');
    let userValue = undefined;
    let m = dateValue ? moment(dateValue, 'YYYY-MM-DD') : null;
    if (m && m.isValid()) {
      userValue = m.format(dateformats[props.intl.locale || DEFAULT_LOCALE].format);
    }

    this.state = {
      value: dateValue,
      userValue,
      valid: true
    };
  }

  formatDate(dateStr) {
    if (dateStr) {
      return new Date(dateStr).toLocaleString();
    } else {
      return '';
    }
  }

  onChangeText(event) {
    this.update(event.target.value);
  }

  validateDate(userValue, locale) {
    if (this.isEmpty(userValue)) {
      return true;
    }
    let m = moment(userValue, dateformats[locale].format, true);
    return m.isValid();
  }

  isEmpty(value) {
    return !value || value.trim() === '';
  }

  update(userValue) {
    this.setState(prevState => {
      let valid = this.validateDate(userValue, this.props.intl.locale || DEFAULT_LOCALE);
      let m = moment(userValue, dateformats[this.props.intl.locale || DEFAULT_LOCALE].format, true);
      let value = null;
      if (!this.isEmpty(userValue) && valid) {
        value = m.format('YYYY-MM-DD');
      }
      let newState = {
        userValue,
        value,
        valid
      };
      return newState;
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.value !== nextState.value) {
      this.props.answerQuestion(this.props.question[0], nextState.value);
    }
  }

  componentDidMount() {
    let locale = this.props.intl.locale || DEFAULT_LOCALE;
    let position = this.props.position || 'top';

    this.pikaday = new Pikaday({
      field: this.input,
      trigger: this.button,
      position: position +'right',
      i18n: dateformats[locale],
      firstDay: dateformats[locale].firstDay,
      format: dateformats[locale].format,
      onSelect: () => this.update(this.input.value)
    });
  }

  componentWillUnmount() {
    this.pikaday && this.pikaday.destroy();
    this.pikaday = null;
  }

  componentWillReceiveProps(nextProps) {
    let qOld = this.props.question[1];
    let dateValue = qOld.get('value');

    let qNew = nextProps.question[1];
    let newDateValue = qNew.get('value');
    if (newDateValue !== dateValue) {
      let userValue = undefined;
      let m = newDateValue ? moment(newDateValue, 'YYYY-MM-DD') : null;
      if (m && m.isValid()) {
        userValue = m.format(dateformats[this.props.intl.locale || DEFAULT_LOCALE].format);
      }
      this.setState({
        value: newDateValue,
        userValue
      });
    }
  }

  render() {
    let q = this.props.question[1];
    return (
      <div className={this.getStyles()}>
        <Label htmlFor={this.getControlId()} required={this.isRequired()}>{q.get('label')}</Label>
        {this.renderDescription()}
        <div className='dialob-datepicker-wrapper'>
          <input
            id={this.getControlId()}
            className='dialob-datepicker-input'
            ref={input => this.input = input}
            type='text'
            name={q.get('id')}
            value={this.state.userValue || ''}
            onChange={this.onChangeText.bind(this)}
            />
          <button type='button' className='dialob-datepicker-button dialob-icon-calendar' ref={button => this.button = button}></button>
        </div>
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

const DateQuestionConnected = connectToAnswer(injectIntl(DateQuestion));

export {
  DateQuestionConnected as default,
  DateQuestion
};
