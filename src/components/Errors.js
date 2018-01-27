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
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {Label} from 'semantic-ui-react';

// Renders a list of validation errors for a form item
class Errors extends React.Component {

  static get propTypes() {
    return {
      errors: PropTypes.object
    };
  }

  getErrorText(error) {
    if (error.get('code')) {
      return this.props.intl.formatMessage({id: error.get('code')});
    } else {
      return error.get('description');
    }
  }

  render() {
    if (this.props.errors) {
        let errors = this.props.errors
            .filter(error => error.get('description') !== 'You must answer this question')
            .map(error => {
                return <span key={error} className='dialob-error dialob-icon-error'>{this.getErrorText(error)}</span>;
            });
        if (errors.size > 0) {
            return <Label basic color='red' pointing className='dialob-errors'>{errors.toJS()}</Label>;
        }
    }
    return null;
  }
}

export default injectIntl(Errors);