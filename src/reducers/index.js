/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import { batchActionsReducer } from './batchActionsReducer';
import { formActionsReducer } from './formActionsReducer';
import { connectionStateReducer } from './connectionStateReducer';
import { configReducer } from './configReducer';



/* Populated by react-webpack-redux:reducer */
const reducers = {
  data: formActionsReducer,
  connection: connectionStateReducer,
  config: configReducer
};

export const reducer =  batchActionsReducer(combineReducers(reducers));

// export const reducer = combineReducers(reducers);
