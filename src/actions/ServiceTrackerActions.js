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

import * as ServiceTrackerActionConstants from './ServiceTrackerActionConstants';

export function startAction(action) {
  return {
    type: ServiceTrackerActionConstants.ACTION_START,
    action
  };
}

export function actionSucceeded(action,result) {
  return {
    type: ServiceTrackerActionConstants.ACTION_SUCCEEDED,
    action,
    result
  };
}

export function actionRejected(action, reason) {
  return {
    type: ServiceTrackerActionConstants.ACTION_REJECTED,
    action,
    reason
  };
}

export function actionFailed(action,reason) {
  return {
    type: ServiceTrackerActionConstants.ACTION_FAILED,
    action,
    reason
  };
}
