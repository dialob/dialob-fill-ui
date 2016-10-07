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
import ChatLine from './ChatLine';
import {connectToAnswer} from '../utils/formUtils';

// In how many milliseconds after last keypress the value is sent to back-end
const SAVE_DELAY = 300;

// Item for single-line text and numeric (integer, decimal) questions
class TextQuestion extends Item {

  static get propTypes() {
    return {
      entryType: React.PropTypes.oneOf(['text', 'number'])
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

  onChangeText(value) {
    //let value = event.target.value;
    if (value === '') {
      value = null;
    }
    this.setState({value});
    if (this.refs.inputControl.type !== 'number') {
      this.setState({cursorPos: this.refs.inputControl.selectionStart});
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.props.answerQuestion(this.props.question[0], value), SAVE_DELAY);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.question[1].get('value')});
  }

  componentDidUpdate() {
    if (this.refs.inputControl.type !== 'number' && this.refs.inputControl === document.activeElement) {
      this.refs.inputControl.setSelectionRange(this.state.cursorPos, this.state.cursorPos);
    }
  }

  keyDown(event) {
    if (event.keyCode == 13) {
      this.onChangeText(event.target.value);
    }
  }

  render() {
    let q = this.question;
    if (!q) {
      return null;
    }
    return (
      <div>
        <ChatLine name={this.getBotName()}>{q.get('label')}</ChatLine>
        <ChatLine name={this.getUserName()}>
          <input ref='inputControl' name={q.get('id')} type={this.props.entryType} defaultValue={this.state.value} onKeyDown={this.keyDown.bind(this)} />
        </ChatLine>
      </div>
    );
  }
}

export const TextQuestionConnected = connectToAnswer(TextQuestion);

export {
  TextQuestionConnected as default,
  TextQuestion
};
