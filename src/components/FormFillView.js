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
import {Loading} from 'flexiform-common';
import {connect} from 'react-redux';
import {findQuestionnaire, findItemById} from '../utils/formUtils';
import Page from './Page';
import * as ActionConstants from '../actions/ActionConstants';

require('styles/questionnaire.scss');

class FormFillView extends React.Component {

  static get propTypes() {
    return {
      questionnaire: React.PropTypes.func.isRequired,
      itemById: React.PropTypes.func.isRequired
    };
  }

  render() {
    let questionnaire = this.props.questionnaire();
    let activePage = null;
    let backEnabled = false;
    let forwardEnabled = false;
    let completeEnabled = false;
    if (questionnaire && questionnaire[1]) {
      activePage = this.props.itemById(questionnaire[1].get('activeItem'));
      // TODO: Check if contains in questionnaire.availableItems?
      backEnabled = questionnaire[1].get('allowedActions').contains(ActionConstants.PREVIOUS_PAGE);
      forwardEnabled = questionnaire[1].get('allowedActions').contains(ActionConstants.NEXT_PAGE);
      completeEnabled = questionnaire[1].get('allowedActions').contains(ActionConstants.COMPLETE_QUESTIONNAIRE);
    }
    if (!activePage) {
      return (<Loading />);
    } else {
      return (
        <div className='ff-questionnaire'>
          <span className='ff-questionnaire-title'>{questionnaire[1].get('label')}</span>
          <Page page={activePage} backEnabled={backEnabled} forwardEnabled={forwardEnabled} completeEnabled={completeEnabled}/>
        </div>
      );
    }
  }
}
const FormFillViewConnected = connect(
  state => {
    return {
      get questionnaire() { return () => findQuestionnaire(state) },
      get itemById() { return itemId => findItemById(state, itemId)}
    };
  }
)(FormFillView);

export {
  FormFillViewConnected as default,
  FormFillView
}
