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
import {componentCreator} from '../../src/utils/componentCreator';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TextQuestion from '../../src/components/TextQuestion';
import { mountWithIntl } from '../helpers/intlHelper';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() });


describe('componentCreator', () => {
  it('should return null on null input', () => {
    var component = componentCreator(null);
    expect(component).to.equal(null);
  });
  it('TODO',()=>{
    let question = {
        id: 'q',
        type: 'text',
        label: 'Question to you',
        className: []
    };
    let context = {
        store: {
            getState: sinon.stub(),
            subscribe: sinon.spy(),
            dispatch: sinon.spy()
        }
    };
    var component = componentCreator([question.id,Immutable.fromJS(question)]);
    var wrapper = mountWithIntl(component,{context});
    expect(wrapper.html()).to.equal('<div class="dialob-item dialob-itemtype-text "><label for="dialob-control-q" class="">Question to you</label><input type="text" id="dialob-control-q" name="q" value=""></div>');
  });
});
