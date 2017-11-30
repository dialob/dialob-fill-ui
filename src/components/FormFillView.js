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
//import {Loading} from 'dialob-common';
import Page from './Page';
import * as ActionConstants from '../actions/ActionConstants';
import PropTypes from 'prop-types';

export default class FormFillView extends React.Component {

  static get propTypes() {
    return {
      status: PropTypes.string,
      questionnaire: PropTypes.object,
      activePageItem: PropTypes.array
    };
  }

  render() {
    let questionnaire = this.props.questionnaire;
    let page = null;
    let title = '';
    if (questionnaire) {
      title = questionnaire.get('label');
      if (this.props.activePageItem) {
        let isAllowedAction = action => questionnaire.get('allowedActions').includes(action);
        let pageProps = {
          page: this.props.activePageItem,
          backEnabled: isAllowedAction(ActionConstants.PREVIOUS_PAGE),
          forwardEnabled: isAllowedAction(ActionConstants.NEXT_PAGE),
          completeEnabled: isAllowedAction(ActionConstants.COMPLETE_QUESTIONNAIRE)
        };
        page = <Page {...pageProps}/>;
      }
    }
    if (this.props.status === 'UNLOADED') {
      return (<div>Loading...</div>);
    } else {
      return (
        <div className='dialob-questionnaire'>
          <span className='dialob-questionnaire-title'>{title}</span>
          {page}
        </div>
      );
    }
  }
}
