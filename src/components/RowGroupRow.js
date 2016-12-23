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
import {deleteRow} from '../actions/Actions';

require('styles/rowgroup.scss');

class RowGroupRow extends React.Component {

  static get propTypes() {
    return {
      group: React.PropTypes.array.isRequired
    };
  }

  static get contextTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired
    };
  }

  render() {
    let group = this.props.group && this.props.group[1];
    if (!group) {
      return null;
    }
    let questions = group.get('items').toJS()
      .map(this.context.componentCreator)
      .filter(question => question);
    return (
      <div className='dialob-rowgroup-row'>
       {questions}
       <button className='dialob-rowgroup-remove dialob-icon-remove' onClick={this.props.removeRow.bind(this)} />
      </div>
    );
  }
}

const RowGroupRowConnected = connect(
  () => { return {}},
  (dispatch, props) => {
    return {
      removeRow: () => dispatch(deleteRow(props.group[0]))
    }
  }
)(RowGroupRow);

export {
  RowGroupRowConnected as default,
  RowGroupRow
};
