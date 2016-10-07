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

  render() {
    let items = null;
    let page = this.props.page && this.props.page[1];
    if (page) {
      let formItems = this.context.itemList(page);
      let toRender = [];
      for (let i = 0; i < formItems.length; i++) {
        if (formItems[i].get('type') === 'note') {
          console.log('NOTE')
          toRender.push(formItems[i]);
          continue;
        }
        let value = formItems[i].get('value');
        if (typeof(value) !== 'undefined' || value != null) {
          console.log('VALUE=', formItems[i].get('value'));
          toRender.push(formItems[i]);
          continue;
        }
         if (typeof(value) === 'undefined' || value == null) {
          console.log('NULL');
          toRender.push(formItems[i]);
          break;
         }
      }
      items = toRender.map(this.context.componentCreator).filter(item => item);
    }
    return (
      <div className='ff-page'>
        {items}
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
