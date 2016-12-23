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
      <button disabled={!enabled} className={classnames('dialob-nav-button', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onBackward}>
        <i className='fa fa-chevron-left'></i>
      </button>
    );
  }

  renderForwardButton() {
    let enabled = this.props.onForward;
    return (
      <button disabled={!enabled} className={classnames('dialob-nav-button', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onForward}>
        <i className='fa fa-chevron-right'></i>
      </button>
    );
  }

  renderCompleteButton() {
    let enabled = this.props.onComplete;
    return (
      <button disabled={!enabled} className={classnames('dialob-complete-button', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onComplete}>
        <i className='fa fa-check'></i>
      </button>
    );
  }

  render() {
    return (
      <div className='dialob-page-controls'>
        <div className='dialob-back-button-wrapper'>
          {this.renderBackButton()}
        </div>
        <div className='dialob-complete-button-wrapper'>
          {this.renderCompleteButton()}
        </div>
        <div className='dialob-forward-button-wrapper'>
          {this.renderForwardButton()}
        </div>
      </div>
    );
  }
}

export default PageBar;
