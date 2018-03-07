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
import ErrorView from '../components/ErrorView';
import {componentCreatorState} from '../utils/componentCreator';
import {findItemById,findValuesetById} from '../utils/formUtils';
import Completed from '../components/Completed';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
import sv from 'react-intl/locale-data/sv';
import messages from '../intl';
import PropTypes from 'prop-types';
import {Loader} from 'semantic-ui-react';

addLocaleData([...en, ...fi, ...sv]);

class Dialob extends React.Component {

  static get propTypes() {
    return {
      componentCreator: PropTypes.func.isRequired,
      status: PropTypes.string
    };
  }

  static get childContextTypes() {
    return {
      componentCreator: PropTypes.func.isRequired,
      valueSetById: PropTypes.func.isRequired
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
    let config = this.props.config;
    let content = <Loader active inline='centered' />;
    let props = {
        status: data.get('status'),
        questionnaire: data.get('questionnaire'),
        activePageItem: findItemById(data, data.getIn(['questionnaire','activeItem']))
    };
    let locale = this.props.config.get('language') || 'en';
    if (this.props.connection.get('connectionError')) {
        content = <ErrorView messageId='error.connection' />
    } else if (this.props.connection.getIn(['serverError', 'message'])) {
        content = <ErrorView messageId='error.server' />
    } else if (props.status === 'NOT_FOUND') {
        content = <ErrorView messageId='error.notfound' />;
    } else if (props.status === 'COMPLETED') {
        content = <Completed reviewUrl={config.get('reviewUrl')}/>;
    } else if (props.status === 'LOADED') {
        content = <FormFillView {...props}/>;
    }
    return (
        <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
          {content}
        </IntlProvider>
    );
  }
}

const DialobConnected = connect(
  state => {
      return {
          data: state.data,
          config: state.config,
          connection: state.connection
      };
  },{
    connect: connectAction
  }
)(Dialob);

export {
  DialobConnected as default
};
