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

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import { shallow, mount } from 'enzyme';
import React from 'react';
import Immutable from 'immutable';

import {Page} from '../../src/components/Page';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() });

describe('Page', () => {

  it('should have its component name as default className', () => {
    var page = {
        id: 'page1',
        items: []
    };
    var context = {
        componentCreator: itemId => null
    };

    var wrapper = shallow(<Page page={[page.id,Immutable.fromJS(page)]} backEnabled={false} completeEnabled={false} forwardEnabled={false} />,{context});
    expect(wrapper.props().className).to.equal('dialob-page');
  });
});
