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
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Segment, Button, Grid, Icon} from 'semantic-ui-react';

class PageBar extends React.Component {

  static get propTypes() {
    return {
      onForward: PropTypes.func,
      onBackward: PropTypes.func,
      onComplete: PropTypes.func,
      prevPageLabel: PropTypes.string,
      nextPageLabel: PropTypes.string
    };
  }

  renderBackButton() {
    let enabled = this.props.onBackward;
    return (
      <Button icon labelPosition='left' disabled={!enabled} className={classnames('dialob-nav-button', 'dialob-icon-back', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onBackward}>
        <Icon name='left arrow' />
        {this.props.prevPageLabel}
      </Button>
    );
  }

  renderForwardButton() {
    let enabled = this.props.onForward;
    return (
      <Button icon labelPosition='right' disabled={!enabled} className={classnames('dialob-nav-button', 'dialob-icon-forward', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onForward}>
        <Icon name='right arrow' />
        {this.props.nextPageLabel}
      </Button>
    );
  }

  renderCompleteButton() {
    let enabled = this.props.onComplete;
    return (
      <Button primary disabled={!enabled} className={classnames('dialob-complete-button', 'dialob-icon-complete', {'dialob-button-disabled': !enabled}, {'dialob-button-enabled': enabled})} onClick={this.props.onComplete}><FormattedMessage id='complete' /></Button>
    );
  }

  render() {
    let first = this.props.pageIndex === 0;
    let last = this.props.pageIndex === this.props.totalPages - 1;
    return (
      <Segment basic>
        <Grid columns={3}>
          <Grid.Column textAlign='left'>
            {first ? null : this.renderBackButton()}
          </Grid.Column>
          <Grid.Column textAlign='center'>
            {this.renderCompleteButton()}
          </Grid.Column>
          <Grid.Column textAlign='right'>
            {last ? null : this.renderForwardButton()}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default injectIntl(PageBar);
