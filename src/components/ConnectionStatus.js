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
import classnames from 'classnames';
import PropTypes from 'prop-types';

class ConnectionStatus extends React.Component {

    static get propTypes() {
        return {
            state: PropTypes.string.isRequired
        };
    }

    render() {
        let indicator = null;
        switch (this.props.state) {
          case 'OPEN':
          case 'CONNECTING':
              indicator = (
                <span className='fa-stack fa-2x'>
                  <i className='fa fa-plug fa-1x'></i>
                </span>
              );
            break;
          case 'CLOSED':
              indicator = (
                 <span className='fa-stack fa-2x'>
                   <i className='fa fa-plug fa-stack-1x'></i>
                   <i className='fa fa-ban fa-stack-2x'></i>
                 </span>
              );
            break;
          default:
              indicator = (<span>{this.props.state}</span>);
        }
        return (
          <div className={classnames('dialob-status-indicator', 'dialob-status-' + this.props.state.toLowerCase())}>
             {indicator}
          </div>
        );
    }
}

const ConnectionStatusConnected = connect(
    state => {
        return {
            state: state.connection.get('state')
        };
    }
)(ConnectionStatus);


export {
    ConnectionStatusConnected as default,
    ConnectionStatus
};
