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

require('styles/errors.scss');

// Renders a list of validation errors for a form item
export default class Errors extends React.Component {

  static get propTypes() {
    return {
      errors: React.PropTypes.object
    };
  }

  render() {
    if (this.props.errors) {
        let errors = this.props.errors
            .filter(error => error !== 'You must answer this question')
            .map(error => {
                return <span key={error} className='dialob-error'><i className='fa fa-exclamation'></i>{error}</span>;
            });
        if (errors.size > 0) {
            return <div className='dialob-errors'>{errors.toJS()}</div>;
        }
    }
    return null;
  }
}
