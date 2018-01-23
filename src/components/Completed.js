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
import PropTypes from 'prop-types';

export default class Completed extends React.Component {

 static get propTypes() {
    return {
        reviewUrl: PropTypes.string
    };
  }

  render() {
    return (
      <div className='dialob-completed'>
        <h2>This session has been completed!</h2>
        {
          this.props.reviewUrl ?
            <p>To review the results, please click <a href={this.props.reviewUrl}>here</a></p>
          : null
        }
      </div>
    );
  }
}
