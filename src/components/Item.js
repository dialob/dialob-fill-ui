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
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {Message} from 'semantic-ui-react';

// Base class for form items
export default class Item extends React.Component {

  static get propTypes() {
    return {
      question: PropTypes.array.isRequired
    };
  }

  get question() {
    return this.props && this.props.question && this.props.question[1];
  }

  set question(value) {  //eslint-disable-line no-unused-vars

  }

  // Returns true if there are any validation errors, also if it is required and not answered
  hasErrors() {
    return (this.question && this.question.get('errors') && this.question.get('errors').size > 0);
  }

  // Returns true if item is required, but not answered
  isRequired() {
    return this.question.get('required');
  }

  // Returns true if item is read-only
  isReadOnly() {
    return !this.question || this.question.get('readOnly');
  }

  // Get DOM ID for input control
  getControlId() {
    return 'dialob-control-' + (this.question ? this.question.get('id') : '');
  }

  hasDescription() {
    let descr = this.question.get('description');
    return (descr && descr.replace(/(?:^[\s\u00a0\u200b]+)|(?:[\s\u00a0\u200b]+$)/g, '').trim());
  }

  renderDescription() {
    if (this.hasDescription()) {
      return (
        <Message size='small' className='dialob-description'>
           <ReactMarkdown source={this.question.get('description')} escapeHtml={true} />
        </Message>
      )
    } else {
      return null;
    }
  }

  // Return styles for this item
  getStyles() {
    let className = this.question && this.question.get('className');
    let customStyles = [];
    if (className) {
      customStyles = className.toJS();
    }

    let hasAnswer = this.question.get('value') != null;
    return classnames(
      'dialob-item',
      'dialob-itemtype-' + (this.question && this.question.get('type')),
      customStyles,
      {'dialob-item-errors': this.hasErrors()},
      {'dialob-item-valid': !this.hasErrors() && hasAnswer},
      {'dialob-item-answered': hasAnswer},
      {'dialob-item-required': this.isRequired()},
      {'dialob-readonly': this.isReadOnly()}
    );
  }
}
