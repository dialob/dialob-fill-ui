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


// test pure version
import {ChoiceQuestion} from 'components/ChoiceQuestion';

describe('ChoiceQuestion', () => {

  it('should have its component name as default className', () => {
    let question = {
        id: 'choice',
        type: 'list',
        valueSetId: 'set1'
    };
    let context = {
        valueSetById: sinon.mock()
    };
    context.valueSetById.once().withExactArgs("set1").returns([
        Immutable.Map({key: 'k1', value: 'v1'}),
        Immutable.Map({key: 'k2', value: 'v2'}),
        Immutable.Map({key: 'k3', value: 'v3'})
    ]);

    var wrapper = shallow(<ChoiceQuestion question={[question.id, Immutable.fromJS(question)]}/>,{context});

    expect(wrapper.props().className).to.equal('dialob-item dialob-itemtype-list ');
    context.valueSetById.verify();
  });
});
