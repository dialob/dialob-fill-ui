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
import {addRow} from '../actions/Actions';
import RowGroupRow from './RowGroupRow';
import {findItemById} from '../utils/formUtils';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

class RowGroup extends React.Component {

  static get propTypes() {
    return {
      group: PropTypes.array.isRequired
    };
  }

  static get contextTypes() {
    return {
      componentCreator: PropTypes.func.isRequired
    };
  }

  renderDescription() {
    if (this.props.group[1].get('description')) {
      return (
        <div className='dialob-description'>
           <ReactMarkdown source={this.props.group[1].get('description')} escapeHtml={true} />
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    let group = this.props.group && this.props.group[1];
    if (!group) {
      return null;
    }

    let className = group.get('className');
    let customStyles = [];
    if (className) {
      customStyles = className.toJS();
    }

    let title = group.get('label');
    let rows = group.get('items').toJS().map(this.props.createRow).filter(item => item);
    return (
      <div className={classnames('dialob-group', 'dialob-rowgroup', customStyles)}>
        <span className='dialob-group-title'>{title}</span>
        {this.renderDescription()}
        {rows}
        <button className='dialob-rowgroup-add dialob-icon-add' onClick={this.props.addNewRow.bind(this)} />
      </div>
    );
  }
}

const RowGroupConnected = connect(
  state => {
    return {
      get createRow() { return rowId => {
           let item = findItemById(state.data, rowId);
           if (item && item[1].get('type') === 'group') {
             return <RowGroupRow key={rowId} group={item} />
           }
           return null;
        }
      }
    }
  },
  (dispatch, props) => {
    return {
      addNewRow: () => dispatch(addRow(props.group[0]))
    }
  }
  )(RowGroup);

export {
  RowGroupConnected as default,
  RowGroup
};
