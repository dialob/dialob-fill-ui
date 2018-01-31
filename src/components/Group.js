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
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {Segment, Header, Message, Grid} from 'semantic-ui-react';

export default class Group extends React.Component {

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
        <Message size='small' className='dialob-description'>
           <ReactMarkdown source={this.props.group[1].get('description')} escapeHtml={true} />
        </Message>
      )
    } else {
      return null;
    }
  }

  getColumnCount() {
    let colStyle = this.props.group[1].get('className') && this.props.group[1].get('className').filter(c => c.startsWith('columns-')).toJS();
    if (colStyle && colStyle.length > 0) {
      let pos = colStyle[0].lastIndexOf('-')+1;
      return parseInt(colStyle[0].substring(pos));
    }
    return 0;
  }

  isDividedColumns() {
    return this.props.group[1].get('className') && this.props.group[1].get('className').contains('divided');
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

    let columns = this.getColumnCount();

    let divided = columns > 0 && this.isDividedColumns;

    let title = group.get('label');
    let questions = group.get('items').toJS()
      .map(this.context.componentCreator)
      .filter(question => question)
      .map((question, key) => columns > 0 ? <Grid.Column key={key}>{question}</Grid.Column> : question);
    return (
      <Segment className={classnames('dialob-group', customStyles)}>
        <Header as='h3' className='dialob-group-title'>{title}</Header>
        { this.renderDescription() }
        {
          columns > 0 ?
          <Grid stackable divided={divided} columns={columns}>
            {questions}
          </Grid>
          : questions
        }
      </Segment>
    );
  }
}

