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

require('normalize.css/normalize.css');
require('styles/app.scss');

class FlexiForm extends React.Component {

  componentDidMount() {
    // this.props.connect();
	}
  static get propTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired
    };
  }

  static get childContextTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired
    };
  }

  getChildContext() {
    return {
      componentCreator: this.props.componentCreator
    };
  }

  render() {
    return <FormFillView />;
  }
}

const FlexiFormConnected = connect(
  null,{
    connect: connectAction
  }
)(FlexiForm);

export {
  FlexiFormConnected as default
};
