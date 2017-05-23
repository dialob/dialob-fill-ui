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

import {RowGroup} from 'components/RowGroup';

describe('RowGroup', () => {

  it('should have its component name as default className', () => {
    var group = {
      id: 'g1',
      type: 'rowgroup',
      items: []
    };
    var context = {
        componentCreator: sinon.mock()
    };
    context.componentCreator.never();

    var createRow = sinon.mock();
    createRow.never();

    var addNewRow = sinon.mock();
    addNewRow.never();

    var wrapper = shallow(<RowGroup group={[group.id,Immutable.fromJS(group)]} addNewRow={addNewRow} createRow={createRow} />,{context});
    expect(wrapper.props().className).to.equal('dialob-group dialob-rowgroup ');
    context.componentCreator.verify();
    createRow.verify();
    addNewRow.verify();
  });
});
