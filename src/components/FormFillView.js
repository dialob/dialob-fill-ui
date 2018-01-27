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
import Page from './Page';
import * as ActionConstants from '../actions/ActionConstants';
import PropTypes from 'prop-types';
import {findItemById} from '../utils/formUtils';
import {connect} from 'react-redux';
import {Loader, Header, Form} from 'semantic-ui-react';

class FormFillView extends React.Component {

  static get propTypes() {
    return {
      status: PropTypes.string,
      questionnaire: PropTypes.object,
      activePageItem: PropTypes.array
    };
  }

  render() {
    const {questionnaire, activePageItem} = this.props;
    let page = null;
    let title = '';

    if (questionnaire) {
      title = questionnaire.get('label');
      if (this.props.activePageItem) {
        let availableItems = questionnaire.get('availableItems');
        let isAllowedAction = action => questionnaire.get('allowedActions').includes(action);
        let pageIndex = pageId => availableItems.findIndex(e => e === pageId);
        let activeIndex = pageIndex(activePageItem[0]);
        let showDisabled = !!questionnaire.getIn(['props', 'showDisabled']);
        let prevPageLabel, nextPageLabel = undefined;
        if (showDisabled) {
          if (activeIndex > 0) {
            prevPageLabel =  this.props.itemById(availableItems.get(activeIndex - 1))[1].get('label');
          }
          if (activeIndex < availableItems.size - 1) {
            nextPageLabel = this.props.itemById(availableItems.get(activeIndex + 1))[1].get('label');
          }
        }
        let last = activeIndex == availableItems.size - 1;
        let pageProps = {
          page: activePageItem,
          backEnabled: isAllowedAction(ActionConstants.PREVIOUS_PAGE),
          forwardEnabled: isAllowedAction(ActionConstants.NEXT_PAGE),
          completeEnabled: isAllowedAction(ActionConstants.COMPLETE_QUESTIONNAIRE) && last,
          prevPageLabel,
          nextPageLabel
        };
        page = <Page {...pageProps}/>;
      }
    }
    if (this.props.status === 'UNLOADED') {
      return (<Loader />);
    } else {
      return (
        <Form className='dialob-questionnaire'>
          <Header as='h1'>{title}</Header>
          {page}
        </Form>
      );
    }
  }
}

const FormFillViewConnected = connect(
  state => {
    return {
      get itemById() { return itemId => findItemById(state.data, itemId) }
    };
  })(FormFillView);

export {
  FormFillViewConnected as default,
  FormFillView
}
