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
import {getItemList} from '../utils/formUtils';
import classnames from 'classnames';

require('styles/page.scss');

// Component for questionnaire page
class Page extends React.Component {

  static get propTypes() {
    return {
      page: React.PropTypes.array.isRequired,
      forwardEnabled: React.PropTypes.bool.isRequired,
      backEnabled: React.PropTypes.bool.isRequired,
      completeEnabled: React.PropTypes.bool.isRequired
    };
  }

  static get contextTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired,
      itemList: React.PropTypes.func.isRequired
    };
  }

  backTouch() {
    if (this.props.backEnabled) {
      this.props.previousPage();
    }
  }

  forwardTouch() {
    if (this.props.forwardEnabled) {
      this.props.nextPage();
    }
  }

  completeTouch() {
    if (this.props.completeEnabled) {
      this.props.completeQuestionnaire();
    }
  }

  hasErrors(question) {
    console.log('E >', question.toJS());
    return (question && question.get('errors') && question.get('errors').size > 0);
  }

  render() {
    let items = null;
    let page = this.props.page && this.props.page[1];
    let footer = null;
    if (page) {
      let formItems = this.context.itemList(page);
      let toRender = [];
      let lastAnswered = false;
      for (let i = 0; i < formItems.length; i++) {
        if (formItems[i].get('type') === 'note') {
          toRender.push(formItems[i]);
          lastAnswered = true;
          continue;
        }
        let value = formItems[i].get('value');
         if (typeof(value) === 'undefined' || value == null || this.hasErrors(formItems[i])) {
          toRender.push(formItems[i]);
          lastAnswered = false;
          break;
         }
         if (typeof(value) !== 'undefined' || value != null) {
          toRender.push(formItems[i]);
          lastAnswered = true;
          continue;
        }
      }
      items = toRender.map(this.context.componentCreator).filter(item => item);
      footer = (toRender.length === formItems.length && lastAnswered) ?
      (<span className={classnames('ff-complete-button', 'ff-button-enabled')} onClick={this.completeTouch.bind(this)}>
        <i className='fa fa-check'></i>
      </span>) : null;
    }
    return (
      <div className='ff-page'>
        {items}
        {footer}
      </div>
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
