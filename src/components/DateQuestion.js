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
import Label from './Label';
import ChatLine from './ChatLine';

// Item for Date and Time questions
class DateQuestion extends Item {

  static get propTypes() {
    return {
      entryType: React.PropTypes.oneOf(['date', 'time'])
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

  keyDown(event) {
    if (event.keyCode == 13) {
      this.props.answerQuestion(this.props.question[0], event.target.value);
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.inputControl).focus();
  }

  render() {
    let q = this.props.question[1];
    let dateValue = q.get('value');
    return (
       <div>
        <ChatLine name={this.getBotName()} className='ff-bot'>{q.get('label')}</ChatLine>
        <ChatLine name={this.getUserName()} className='ff-user'>
          <input ref='inputControl' name={q.get('id')} type={this.props.entryType} defaultValue={dateValue} onKeyDown={this.keyDown.bind(this)} />
        </ChatLine>
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
