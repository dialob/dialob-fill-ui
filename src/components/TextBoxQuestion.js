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

// How many lines to grow the input area before displaying a scrollbar
const MAX_LINES = 25;

// Item for multi-line (textbox) questions
class TextBoxQuestion extends TextQuestion {

  getLineCount(text) {
		if (text) {
			let lines = String(text).split(/\r*\n/).length;
			return lines > MAX_LINES ? MAX_LINES : lines;
	  } else {
			return 1;
		}
	}

  onChangeText(event) {
    super.onChangeText(event);
    this.refs.inputControl.rows = this.getLineCount(event.target.value);
  }

  render() {
    let q = this.props.question[1];
    let rows = this.getLineCount(q.get('value'));
    return (
      <div className={this.getStyles()}>
        <Label htmlFor={this.getControlId()} required={this.isRequired()}>{q.get('label')}</Label>
        <textarea id={this.getControlId()} ref='inputControl' value={this.state.value}  rows={rows} onChange={this.onChangeText.bind(this)}/>
        <Errors errors={q.get('errors')} />
      </div>
    );
  }
}

export const TextBoxQuestionConnected = connectToAnswer(TextBoxQuestion);

export {
 TextBoxQuestionConnected as default,
 TextBoxQuestion
};
