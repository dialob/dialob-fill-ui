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

class PageBar extends React.Component {

  static get propTypes() {
    return {
      onForward: React.PropTypes.func,
      onBackward: React.PropTypes.func,
      onComplete: React.PropTypes.func
    };
  }

  renderBackButton() {
    let enabled = this.props.onBackward;
    return (
      <span className={classnames('dialob-nav-button', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onBackward}>
        <i className='fa fa-chevron-left'></i>
      </span>
    );
  }

  renderForwardButton() {
    let enabled = this.props.onForward;
    return (
      <span className={classnames('dialob-nav-button', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onForward}>
        <i className='fa fa-chevron-right'></i>
      </span>
    );
  }

  renderCompleteButton() {
    let enabled = this.props.onComplete;
    return (
      <span className={classnames('dialob-complete-button', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onComplete}>
        <i className='fa fa-check'></i>
      </span>
    );
  }

  render() {
    return (
      <div className='dialob-page-controls'>
        <div>
        {this.renderBackButton()}
        </div>
        <div>
        {this.renderCompleteButton()}
        </div>
        <div>
        {this.renderForwardButton()}
        </div>
      </div>
    );
  }
}

export default PageBar;
