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
import {connect} from 'react-redux';
import PageBar from './PageBar';
import {nextPage, previousPage, completeQuestionnaire} from '../actions/Actions';
import PropTypes from 'prop-types';
import {Segment, Header} from 'semantic-ui-react';

// Component for questionnaire page
class Page extends React.Component {

  static get propTypes() {
    return {
      page: PropTypes.array.isRequired,
      forwardEnabled: PropTypes.bool.isRequired,
      backEnabled: PropTypes.bool.isRequired,
      completeEnabled: PropTypes.bool.isRequired
    };
  }

  static get contextTypes() {
    return {
      componentCreator: PropTypes.func.isRequired
    };
  }

  backTouch() {
    if (this.props.backEnabled) {
      this.page.scrollIntoView();
      this.props.previousPage();
    }
  }

  forwardTouch() {
    if (this.props.forwardEnabled) {
      this.page.scrollIntoView();
      this.props.nextPage();
    }
  }

  completeTouch() {
    if (this.props.completeEnabled) {
      this.props.completeQuestionnaire();
    }
  }

  render() {
    let groups = null;
    let title = 'Not on page!';
    let page = this.props.page && this.props.page[1];
    if (page) {
      groups = page.get('items').toJS()
        .map(this.context.componentCreator)
        .filter(group => group);
      title = page.get('label');
    }
    return (
      <Segment basic className='dialob-page' ref={pg => this.page = pg}>
        <Header as='h2' className='dialob-page-title'>{title}</Header>
        {groups}
        <PageBar
          onForward={this.props.forwardEnabled ? this.forwardTouch.bind(this) : null}
          onBackward={this.props.backEnabled ? this.backTouch.bind(this) : null}
          onComplete={this.props.completeEnabled ? this.completeTouch.bind(this) : null}
          prevPageLabel={this.props.prevPageLabel}
          nextPageLabel={this.props.nextPageLabel}
          />
      </Segment>
    );
  }
}

const PageConnected = connect(
  null,
  {
    nextPage,
    previousPage,
    completeQuestionnaire
  }
)(Page);

export {
  PageConnected as default,
  Page
}
