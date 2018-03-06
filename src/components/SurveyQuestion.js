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
import {connectToAnswer} from '../utils/formUtils';
import Item from './Item';
import Label from './Label';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Table, Radio, Button, Popup} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

// Form item for survey choices
class SurveyQuestion extends Item {

  static get contextTypes() {
    return {
      valueSetById: PropTypes.func.isRequired,
      surveyValueSet: PropTypes.func.isRequired
    };
  }

  onChange(value) {
   this.props.answerQuestion(this.props.question[0], value);
  }

  renderDescription() {
    if (this.props.question[1].get('description')) {
      return (<Popup
        hoverable
        trigger={<Button style={{marginLeft: '0.5em'}} size='mini' icon='info' />}>
        <ReactMarkdown source={this.props.question[1].get('description')} escapeHtml={true} />
      </Popup>);
    }
    return null;
  }

  option(key) {
    let q = this.props.question[1];
    return (
      <Table.Cell className='dialob-survey-option' key={key} textAlign='center'>
        <Radio type='radio' name={q.get('id')} value={key} checked={q.get('value') === key} onChange={this.onChange.bind(this, key)} />
      </Table.Cell>
    );
  }

  choiceList() {
    let choices = [];
    let valueSet = this.context.surveyValueSet();
    if (valueSet) {
      choices = valueSet.map(e => this.option(e.get('key')));
    }
    return choices;
  }

  render() {
    let q = this.props.question[1];
    let options = this.choiceList();
    return (
      <Table.Row error={this.hasErrors()}>
        <Table.Cell><Label htmlFor={q.get('id')} required={this.isRequired()}>{q.get('label')}</Label>{this.renderDescription()}</Table.Cell>
        {options}
      </Table.Row>
    );
  }
}

export const SurveyQuestionConnected = connectToAnswer(SurveyQuestion);

export {
  SurveyQuestionConnected as default,
  SurveyQuestion
};
