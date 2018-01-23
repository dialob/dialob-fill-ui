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
import { shallowWithIntl } from '../helpers/intlHelper';

import Errors from '../../src/components/Errors';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() });

describe('Errors', () => {

  it('should not output anything, if there is no errors', () => {
    var wrapper = shallowWithIntl(<Errors errors={null} />);
    expect(wrapper.html()).to.equal('');
  });

  it('should render immutable set to errors', () => {
    var errors = Immutable.fromJS([
      {description: 'Error 1'},
      {description: 'Error 2'}
    ]);
    var wrapper = shallowWithIntl(<Errors errors={errors}/>);
    expect(wrapper.html()).to.equal('<div class="dialob-errors"><span class="dialob-error dialob-icon-error">Error 1</span><span class="dialob-error dialob-icon-error">Error 2</span></div>');
  });
  it('"You must answer this question" is not rendered', () => {
    var errors = Immutable.fromJS([
      {description: 'You must answer this question'}
    ]);
    var wrapper = shallowWithIntl(<Errors errors={errors}/>);
    expect(wrapper.html()).to.equal('');
  });
});
