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

import Errors from 'components/Errors';

describe('Errors', () => {

  it('should not output anything, if there is no errors', () => {
    var wrapper = shallow(<Errors errors={null}/>);
    expect(wrapper.html()).to.equal(null);
  });

  it('should render immutable set to errors', () => {
    var wrapper = shallow(<Errors errors={Immutable.Set.of('Error 1','Error 2')}/>);
    expect(wrapper.html()).to.equal('<div class="dialob-errors"><span class="dialob-error"><i class="fa fa-exclamation"></i>Error 1</span><span class="dialob-error"><i class="fa fa-exclamation"></i>Error 2</span></div>');
  });
  it('"You must answer this question" is not rendered', () => {
    var wrapper = shallow(<Errors errors={Immutable.Set.of('You must answer this question')}/>);
    expect(wrapper.html()).to.equal(null);
  });
});
