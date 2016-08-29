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

require('styles/tristate.scss');

// Form item for boolean (yes/no) questions
class BooleanQuestion extends Item {

  onChange(value) {
    this.props.answerQuestion(this.props.question[0], value);
  }

  // Keyboard interaction
  keyPress(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
      // Space: toggle
      case 32: this.onChange(!this.props.question[1].get('value'));
               break;
      // Y: yes / true
      case 89: this.onChange(true);
               break;
      // N: no / false
      case 78: this.onChange(false);
               break;
    }
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
       <div className={this.getStyles()}>
        <Label htmlFor={q.get('id')} required={this.isRequired()}>{q.get('label')}</Label>
        <div id={q.get('id')}>
          <div className={classnames('ff-tristate-control')} tabIndex={0} onKeyDown={this.keyPress.bind(this)}>
            <span className={classnames('ff-tristate-true', {'ff-tristate-active': (value === true)})} onClick={this.onChange.bind(this, true)}>Yes</span>
            <span className={classnames('ff-tristate-false', {'ff-tristate-active': (value === false)})} onClick={this.onChange.bind(this, false)}>No</span>
          </div>
        </div>
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}


export const BooleanQuestionConnected = connectToAnswer(BooleanQuestion);

export {
  BooleanQuestionConnected as default,
  BooleanQuestion
};
