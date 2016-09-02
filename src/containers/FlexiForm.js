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
import FormFillView from '../components/FormFillView';
import {connect as connectAction} from '../actions/Actions';
import {connect} from 'react-redux';
import ConnectionStatus from '../components/ConnectionStatus';
import QuestionnaireNotFound from '../components/QuestionnaireNotFound';
import {componentCreatorState} from '../utils/componentCreator';
import {findItemById,findValuesetById} from '../utils/formUtils';

require('normalize.css/normalize.css');
require('styles/app.scss');

class FlexiForm extends React.Component {

  static get propTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired,
      status: React.PropTypes.string
    };
  }

  static get childContextTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired,
      valueSetById: React.PropTypes.func.isRequired
    };
  }

  getChildContext() {
    return {
      componentCreator: itemId => componentCreatorState(this.props.data,this.props.componentCreator,itemId),
      valueSetById: setId => findValuesetById(this.props.data, setId)
    };
  }


  render() {
    let data = this.props.data;
    let content = null;
    let props = {
        status: data.get('status'),
        questionnaire: data.get('questionnaire'),
        activePageItem: findItemById(data, data.getIn(['questionnaire','activeItem']))
    };
    if (props.status === 'NOT_FOUND') {
        content = <QuestionnaireNotFound/>;
    } else {
        content = <FormFillView {...props}/>;
    }
    return (
        <div>
          <ConnectionStatus />
          {content}
        </div>);
  }
}

const FlexiFormConnected = connect(
  state => {
      return {
          data: state.data
      };
  },{
    connect: connectAction
  }
)(FlexiForm);

export {
  FlexiFormConnected as default
};
