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

/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/

import { shallow, mount } from 'enzyme';
import React from 'react';
import Immutable from 'immutable';
import sinon from 'sinon';

import {SurveyQuestion} from 'components/SurveyQuestion';

describe('SurveyQuestion', () => {
  it('should have its component name as default className', () => {
    let question = {
      id: 'testq',
      type: 'text',
      className: ['survey']
    };
    var context = {
        surveyValueSet: sinon.mock()
    };
    context.surveyValueSet.once().returns([
        Immutable.Map({key: 'k1', value: 'v1'})
    ]);

    let wrapper = shallow(<SurveyQuestion question={[question.id, Immutable.fromJS(question)]}/>,{context});
    expect(wrapper.props().className).to.equal('dialob-item dialob-itemtype-text survey');
    context.surveyValueSet.verify();
  });
});
