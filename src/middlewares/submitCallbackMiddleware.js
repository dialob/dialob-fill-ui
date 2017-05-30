import * as Actions from '../actions/ActionConstants';

const submitCallbackMiddleware = store => next => action =>  {
  if (action.type === Actions.COMPLETE_QUESTIONNAIRE && action.questionnaireId) {
    let callback = store.getState().config.get('submitCallback');
    if (callback) {
      let context = {
        questionnaireId: action.questionnaireId
      }
      callback(context);
    }
  }
  return next(action);
}

export {
  submitCallbackMiddleware
};
