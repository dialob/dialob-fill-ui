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

import {FormFillView} from 'components/FormFillView';

describe('FormFillView', () => {

  it('should have its component name as default className', () => {
    var wrapper = shallow(<FormFillView 
      questionnaire={() => ['questionnaire',Immutable.fromJS({activeItem: 'page1',allowedActions:[]})]}
      itemById={() => ['page1',Immutable.fromJS({id:'page1'})]}
      />);
    expect(wrapper.props().className).to.equal('ff-questionnaire');
  });
});
