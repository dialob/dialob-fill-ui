/**
 *  Copyright 2017 ReSys OÜ
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

import * as Actions from '../actions/ActionConstants';
import {setLanguage} from '../actions/Actions';

const languageMiddleware = store => next => action =>  {
  if (action.type === Actions.NEW_QUESTION && action.question.type == 'questionnaire') {
    if (action.question.props && action.question.props.language) {
      store.dispatch(setLanguage(action.question.props.language));
    }
  }
  return next(action);
}

export {
  languageMiddleware
};
