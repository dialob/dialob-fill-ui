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

require('styles/group.scss');

export default class SurveyGroup extends React.Component {

  static get propTypes() {
    return {
      group: React.PropTypes.array.isRequired
    };
  }

  static get contextTypes() {
    return {
      componentCreator: React.PropTypes.func.isRequired,
      valueSetById: React.PropTypes.func.isRequired
    };
  }

  static get childContextTypes() {
    return {
      surveyValueSet: React.PropTypes.func.isRequired
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
    let questions = group.get('items').toJS()
      .map(this.context.componentCreator)
      .filter(question => question);
    let valueSet = this.context.valueSetById(group.get('valueSetId'));
    let headers = [];
    if (valueSet) {
      headers = valueSet.toJS().map(e => <span key={e.key}>{e.value}</span>);
    }
    let surveyHeader = null;
    if (headers.length > 0) {
      surveyHeader = (
        <div className='dialob-survey-header'>
          <span className='dialob-survey-label'></span>
          {headers}
        </div>
      );
    }

    return (
      <div className={classnames('dialob-group', 'dialob-survey', customStyles)}>
        <span className='dialob-group-title'>{title}</span>
        {this.renderDescription()}
        {surveyHeader}
        {questions}
      </div>
    );
  }
}

