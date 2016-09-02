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

class ConnectionStatus extends React.Component {

    static get propTypes() {
        return {
            state: React.PropTypes.string.isRequired
        };
    }

    render() {
        return <div>{this.props.state}</div>;
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
