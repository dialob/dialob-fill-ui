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

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Item from './components/Item';
import Label from './components/Label';
import Errors from './components/Errors';
import FlexiForm from './containers/FlexiForm';
import {createStore} from './stores';
import {componentCreator} from './utils/componentCreator';
import {connectToAnswer} from './utils/formUtils';

require('styles/app.scss');

// TODO add support for callbacks
function renderFlexiForm(element,config) {
  if (typeof config === 'string') {
    config = {
      url: config
    };
  }

  var delegateComponentCreator = componentCreator;
  if (config.componentCreator) {
    const customComponentCreator = config.componentCreator;
    delegateComponentCreator = item => customComponentCreator(item,componentCreator);
    delete config.componentCreator;
  }

  var store = createStore({config});

  ReactDOM.render(<Provider store={store}><FlexiForm componentCreator={delegateComponentCreator}/></Provider>, element);
}

export {
  renderFlexiForm,
  connectToAnswer,
  Item,
  Label,
  Errors
};
