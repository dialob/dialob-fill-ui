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
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Segment, Header, Table, Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {findItemById} from '../utils/formUtils';

class SurveyGroup extends React.Component {

  static get propTypes() {
    return {
      group: PropTypes.array.isRequired
    };
  }

  static get contextTypes() {
    return {
      componentCreator: PropTypes.func.isRequired,
      valueSetById: PropTypes.func.isRequired
    };
  }

  static get childContextTypes() {
    return {
      surveyValueSet: PropTypes.func.isRequired
    };
  }

  getChildContext() {
    return {
      surveyValueSet: () => this.context.valueSetById(this.props.group[1].get('valueSetId'))
    };
  }

  renderDescription() {
    if (this.props.group[1].get('description')) {
      return (
        <Message size='small' className='dialob-description'>
           <ReactMarkdown source={this.props.group[1].get('description')} escapeHtml={true} />
        </Message>
      );
    } else {
      return null;
    }
  }

  hasStyleClass(styleClass) {
    return this.props.group && this.props.group[1].get('className') && this.props.group[1].get('className').contains(styleClass);
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
    let vertical = this.hasStyleClass('vertical');
    let title = group.get('label');

    let valueSet = this.context.valueSetById(group.get('valueSetId'));
    let headers = [];
    if (valueSet) {
      headers = valueSet.toJS().map(e => <Table.HeaderCell key={e.key} textAlign='center'>{e.value}</Table.HeaderCell>);
    }

    let questions = group.get('items').toJS()
      .map(itemId => this.props.createRow(itemId, this.context.componentCreator, headers.length + 1))
      .filter(question => question);

    let surveyHeader = null;
    if (headers.length > 0) {
      surveyHeader = (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {headers}
          </Table.Row>
        </Table.Header>
      );
    }

    return (
      <Segment className={classnames('dialob-group', 'dialob-rowgroup', customStyles)}>
        <Header as='h3' className='dialob-group-title'>{title}</Header>
        {this.renderDescription()}
        <Table definition>
          {surveyHeader}
          <Table.Body>
            {questions}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

const SurveyGroupConnected = connect(
  state => {
    return {
      get createRow() { return (itemId, create, columnCount) => {
           let item = findItemById(state.data, itemId);
           if (item && !(item[1].get('className') && item[1].get('className').contains('survey'))) {
             return (
              <Table.Row key={itemId}>
                <Table.Cell colSpan={columnCount}>
                  {create(itemId)}
                </Table.Cell>
              </Table.Row>
             );
           }
           return create(itemId);
        }
      }
    }
  },
  {}
  )(SurveyGroup);

export {
  SurveyGroupConnected as default,
  SurveyGroup
};

