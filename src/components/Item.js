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

require('styles/item.scss');

// Base class for form items
class Item extends React.Component {

  static get propTypes() {
    return {
      question: React.PropTypes.array.isRequired
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
    let errors = this.question.get('errors');
    if (!errors || errors.size === 0) {
      return false;
    }
    let required = errors.includes('You must answer this question');
    return required;
  }

  // Returns true if item is read-only
  isReadOnly() {
    return !this.question || this.question.get('readOnly');
  }

  // Return styles for this item
  getStyles() {
    let className = this.question && this.question.get('className');
    let customStyles = [];
    if (className) {
      customStyles = className.toJS();
    }

    return classnames(
      'ff-item',
      'ff-itemtype-' + (this.question && this.question.get('type')),
      customStyles,
      {'ff-item-errors': this.hasErrors()},
      {'ff-readonly': this.isReadOnly()}
    );
  }
}

export default Item;
